# Leah Morgenstern — Shopify Theme Setup

## Step 1: Upload the Theme
1. In Shopify admin → Online Store → Themes
2. Click "Add theme" → "Upload zip file"
3. Upload `leah-morgenstern-theme.zip`

## Step 2: Upload Assets
Upload these files to Shopify admin → Content → Files:
- `assets/logo/logo.png` → upload as `logo.png`
- `assets/lifestyle/leah morgenstern about me pic .webp` → upload as `leah-morgenstern-about-me-pic.webp`
- `assets/products/custom 3 jpeg.jpeg` → upload as `custom-3.jpeg`
- `assets/video/lifestyle.mov` → upload as `lifestyle.mov`
- `assets/video/hero-hands.mp4` → upload as `hero-hands.mp4`

## Step 3: Create Collections
Create these collections in Shopify admin → Products → Collections:
- **All** (handle: `all`) — include all products
- **Necklaces** (handle: `necklaces`) — product type = Necklaces
- **Bracelets** (handle: `bracelets`) — product type = Bracelets
- **Earrings** (handle: `earrings`) — product type = Earrings
- **Rings** (handle: `rings`) — product type = Rings
- **Custom** (handle: `custom`) — product type = Custom

## Step 4: Add Products
Add each product with:
- **Title**: Product name
- **Description**: The product description text
- **Price**: The product price
- **Product type**: Necklaces / Bracelets / Earrings / Rings / Custom
- **Images**: Upload product images (image 1 = main, image 2 = hover alt)
- **Tags** (add relevant ones):
  - `inquire-only` → shows "Inquire" + inquiry copy on product page
  - `sold-out` → shows "Sold Out"
  - `rotate-180` → rotates main image 180°
  - `price-from` → shows "From $X"
  - `made-in-italy` → shows "Made in Italy"
  - `made-in-nyc` → shows "Made in New York City"

## Step 5: Add Product Handles
Make sure product URL handles match the ones in index.liquid featured section:
- classic-bangle
- tennis-bracelet
- silk-rope-necklace
- featherlight-ovals

## Step 6: Create Pages
Create these pages in Shopify admin → Online Store → Pages:
- **About** (handle: `about`) → assign template `page.about`
- **Custom** (handle: `custom`) → assign template `page.custom`
- **Contact** → Shopify's built-in contact page works, or create one with handle `contact` and template `page.contact`

## Step 7: Product Metafields (Optional — for Materials)
To show "Material" on product pages:
1. Settings → Custom data → Products → Add definition
2. Namespace: `custom`, Key: `materials`, Type: Single line text
3. Fill in materials for each product in the product editor

## Step 8: Navigation
Set up navigation in Online Store → Navigation:
- Main menu: Shop, About, Custom, Contact
- Footer menus as needed
