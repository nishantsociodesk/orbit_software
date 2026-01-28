import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/store/cartStore';
import ProductReviews from '@/components/ProductReviews';
import { Product } from '@/types/product';
import { fetchStorefrontProduct, fetchStorefrontProducts } from '@/lib/storefrontApi';

export default function ProductDetail({ productId }: { productId: string }) {
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [product?.id]);

  useEffect(() => {
    let isMounted = true;
    const loadProduct = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const [selected, data] = await Promise.all([
          fetchStorefrontProduct(productId),
          fetchStorefrontProducts()
        ]);
        if (!isMounted) return;
        setProduct(selected);
        setRelatedProducts(
          data
            .filter((item) => item.id !== productId && item.category === selected?.category)
            .slice(0, 4)
        );
      } catch (error) {
        if (!isMounted) return;
        setLoadError('Unable to load product details right now.');
        setProduct(null);
        setRelatedProducts([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProduct();
    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (isLoading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 animate-pulse">
            <div className="aspect-square rounded-lg bg-gray-200" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-gray-200 rounded" />
              <div className="h-6 w-1/2 bg-gray-200 rounded" />
              <div className="h-20 w-full bg-gray-200 rounded" />
              <div className="h-12 w-40 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Safety check
  if (!product) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Product not found</h1>
          <p style={{ color: 'var(--text-muted)' }}>The product you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const priceNum = product.priceNum;
  const imageList = product.images?.length ? product.images : [product.image];

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
      const newQuantity = prev + delta;
      if (newQuantity < 1) return 1;
      if (newQuantity > 5) return 5;
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: priceNum,
      image: product.images ? product.images[0] : product.image,
      shortDescription: product.shortDescription || product.description,
    }, quantity);

    setShowCartMessage(true);
    setTimeout(() => setShowCartMessage(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = '/checkout';
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {loadError && (
          <div className="mb-6 rounded-lg border px-4 py-3 text-sm" style={{ borderColor: 'var(--card-border)', color: 'var(--text-muted)', backgroundColor: 'var(--card-bg)' }}>
            {loadError}
          </div>
        )}
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="hover:underline" style={{ color: 'var(--text-muted)' }}>
              Home
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <Link href="/#products" className="hover:underline" style={{ color: 'var(--text-muted)' }}>
              Products
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text)' }}>{product.name}</span>
          </div>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="mb-4 rounded-lg overflow-hidden border" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)' }}>
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={imageList[selectedImageIndex] || product.image}
                  alt={`${product.name} - View ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {imageList.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  onMouseEnter={() => setSelectedImageIndex(index)}
                  className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === index ? 'ring-2' : ''
                    }`}
                  style={{
                    borderColor: selectedImageIndex === index
                      ? 'var(--header-text)'
                      : 'var(--card-border)',
                    backgroundColor: 'var(--card-bg)',
                    boxShadow: selectedImageIndex === index
                      ? '0 0 0 2px var(--header-text)'
                      : 'none',
                  }}

                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24">
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              {product.name}
            </h1>

            {/* Price and Discount */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <span className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl line-through" style={{ color: 'var(--text-muted)' }}>
                    {product.originalPrice}
                  </span>
                )}
                {product.discount && (
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: '#dc2626',
                      color: '#ffffff'
                    }}
                  >
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-lg mb-6" style={{ color: 'var(--text-muted)' }}>
              {product.shortDescription || product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-lg border flex items-center justify-center font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  style={{
                    borderColor: 'var(--card-border)',
                    color: 'var(--text)',
                    backgroundColor: 'var(--card-bg)'
                  }}
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <span
                  className="w-16 text-center text-xl font-semibold"
                  style={{ color: 'var(--text)' }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 5}
                  className="w-10 h-10 rounded-lg border flex items-center justify-center font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  style={{
                    borderColor: 'var(--card-border)',
                    color: 'var(--text)',
                    backgroundColor: 'var(--card-bg)'
                  }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <span className="text-sm ml-2" style={{ color: 'var(--text-muted)' }}>
                  (Min: 1 | Max: 5)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold text-lg transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--header-text)',
                    color: 'var(--header-bg)'
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold text-lg border-2 transition-opacity hover:opacity-90"
                  style={{
                    borderColor: 'var(--header-text)',
                    color: 'var(--header-text)',
                    backgroundColor: 'transparent'
                  }}
                >
                  Buy Now
                </button>
              </div>
              {showCartMessage && (
                <div className="flex items-center gap-3 p-4 rounded-lg border" style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--card-border)' }}>
                  <svg className="w-5 h-5 shrink-0" style={{ color: '#16a34a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="grow" style={{ color: 'var(--text)' }}>
                    Added {quantity} x {product.name} to cart!
                  </span>
                  <Link
                    href="/cart"
                    className="px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-90 text-sm"
                    style={{
                      backgroundColor: 'var(--header-text)',
                      color: 'var(--header-bg)'
                    }}
                  >
                    View Cart
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Below-the-fold Section */}
        <div className="border-t pt-8" style={{ borderColor: 'var(--card-border)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                Product Description
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                {product.description}
              </p>
            </div>

            {/* Features List */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                Features
              </h2>
              <ul className="space-y-3">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-3 mt-0.5 shrink-0"
                      style={{ color: 'var(--header-text)' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span style={{ color: 'var(--text-muted)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="mt-12 p-6 rounded-lg border" style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--card-border)' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
              Shipping Information
            </h2>
            <div className="space-y-2" style={{ color: 'var(--text-muted)' }}>
              <p><strong style={{ color: 'var(--text)' }}>Free Shipping:</strong> Orders above ₹2,000 qualify for free shipping across India.</p>
              <p><strong style={{ color: 'var(--text)' }}>Standard Delivery:</strong> 3-5 business days for metro cities, 5-7 business days for other locations.</p>
              <p><strong style={{ color: 'var(--text)' }}>Express Delivery:</strong> Available for select locations. Delivery within 1-2 business days.</p>
              <p><strong style={{ color: 'var(--text)' }}>Cash on Delivery:</strong> Available for orders up to ₹5,000.</p>
              <p><strong style={{ color: 'var(--text)' }}>Returns:</strong> 7-day return policy. Items must be in original condition with all packaging.</p>
            </div>
          </div>
        </div>

        {/* Reviews and Q&A Section */}
        <div className="mt-12">
          <ProductReviews productId={product.id} />
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t pt-12 mt-12" style={{ borderColor: 'var(--card-border)' }}>
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border"
                  style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                >
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="aspect-square bg-gray-200 overflow-hidden cursor-pointer relative">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <h3 className="text-lg font-semibold mb-1 hover:underline truncate" style={{ color: 'var(--text)' }}>
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="font-bold" style={{ color: 'var(--text)' }}>{relatedProduct.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

