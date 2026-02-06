const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Theme Management Service
 * Handles theme creation, configuration, and deployment
 */
class ThemeService {
  /**
   * Create a new theme
   */
  async createTheme(data) {
    const {
      name,
      slug,
      category,
      description,
      thumbnail,
      version,
      config,
      previewUrl,
      repository
    } = data;

    // Check if slug already exists
    const existing = await prisma.theme.findUnique({
      where: { slug }
    });

    if (existing) {
      throw new Error(`Theme with slug '${slug}' already exists`);
    }

    const theme = await prisma.theme.create({
      data: {
        name,
        slug,
        category,
        description,
        thumbnail,
        version: version || '1.0.0',
        config: config || {},
        previewUrl,
        repository,
        isActive: true
      }
    });

    console.log(`[Theme] Created: ${theme.name} (${theme.slug})`);
    return theme;
  }

  /**
   * Get all themes
   */
  async getAllThemes(activeOnly = false) {
    const where = activeOnly ? { isActive: true } : {};

    const themes = await prisma.theme.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return themes;
  }

  /**
   * Get theme by ID
   */
  async getThemeById(id) {
    const theme = await prisma.theme.findUnique({
      where: { id },
      include: {
        _count: {
          select: { stores: true }
        }
      }
    });

    if (!theme) {
      throw new Error(`Theme not found: ${id}`);
    }

    return theme;
  }

  /**
   * Get theme by slug
   */
  async getThemeBySlug(slug) {
    const theme = await prisma.theme.findUnique({
      where: { slug }
    });

    if (!theme) {
      throw new Error(`Theme not found: ${slug}`);
    }

    return theme;
  }

  /**
   * Update theme
   */
  async updateTheme(id, data) {
    const {
      name,
      category,
      description,
      thumbnail,
      version,
      config,
      previewUrl,
      repository,
      isActive
    } = data;

    const theme = await prisma.theme.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(category !== undefined && { category }),
        ...(description !== undefined && { description }),
        ...(thumbnail && { thumbnail }),
        ...(version && { version }),
        ...(config && { config }),
        ...(previewUrl && { previewUrl }),
        ...(repository && { repository }),
        ...(isActive !== undefined && { isActive })
      }
    });

    console.log(`[Theme] Updated: ${theme.name}`);
    return theme;
  }

  /**
   * Delete theme
   */
  async deleteTheme(id) {
    // Check if theme is in use
    const storeCount = await prisma.store.count({
      where: { themeId: id }
    });

    if (storeCount > 0) {
      throw new Error(`Cannot delete theme. It is currently used by ${storeCount} store(s)`);
    }

    await prisma.theme.delete({
      where: { id }
    });

    console.log(`[Theme] Deleted: ${id}`);
  }

  /**
   * Activate/Deactivate theme
   */
  async toggleThemeStatus(id, isActive) {
    const theme = await prisma.theme.update({
      where: { id },
      data: { isActive }
    });

    console.log(`[Theme] ${isActive ? 'Activated' : 'Deactivated'}: ${theme.name}`);
    return theme;
  }

  /**
   * Get theme configuration
   */
  async getThemeConfig(themeId) {
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
      select: { config: true }
    });

    if (!theme) {
      throw new Error(`Theme not found: ${themeId}`);
    }

    return theme.config;
  }

  /**
   * Update theme configuration
   */
  async updateThemeConfig(themeId, config) {
    const theme = await prisma.theme.update({
      where: { id: themeId },
      data: { config }
    });

    console.log(`[Theme] Config updated for: ${theme.name}`);
    return theme;
  }

  /**
   * Get stores using a theme
   */
  async getStoresByTheme(themeId) {
    const stores = await prisma.store.findMany({
      where: { themeId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true
          }
        }
      }
    });

    return stores;
  }

  /**
   * Seed default themes
   */
  async seedDefaultThemes() {
    const defaultThemes = [
      {
        name: 'Upfront Modern',
        slug: 'upfront-modern',
        description: 'A clean and modern e-commerce theme with minimalist design',
        version: '1.0.0',
        config: {
          colors: {
            primary: '#4F46E5',
            secondary: '#10B981',
            accent: '#F59E0B'
          },
          layout: 'grid',
          features: ['mega-menu', 'quick-view', 'wishlist', 'compare']
        }
      },
      {
        name: 'Upfront Classic',
        slug: 'upfront-classic',
        description: 'Traditional e-commerce layout with proven conversion patterns',
        version: '1.0.0',
        config: {
          colors: {
            primary: '#1F2937',
            secondary: '#3B82F6',
            accent: '#EF4444'
          },
          layout: 'list',
          features: ['sidebar-filter', 'breadcrumbs', 'reviews']
        }
      },
      {
        name: 'Upfront Minimal',
        slug: 'upfront-minimal',
        description: 'Ultra-minimal design focused on product photography',
        version: '1.0.0',
        config: {
          colors: {
            primary: '#000000',
            secondary: '#FFFFFF',
            accent: '#6B7280'
          },
          layout: 'masonry',
          features: ['fullscreen-images', 'minimal-ui', 'smooth-scroll']
        }
      }
    ];

    const created = [];

    for (const themeData of defaultThemes) {
      try {
        const existing = await prisma.theme.findUnique({
          where: { slug: themeData.slug }
        });

        if (!existing) {
          const theme = await this.createTheme(themeData);
          created.push(theme);
        }
      } catch (error) {
        console.error(`Error seeding theme ${themeData.slug}:`, error.message);
      }
    }

    console.log(`[Theme] Seeded ${created.length} default themes`);
    return created;
  }
}

module.exports = new ThemeService();
