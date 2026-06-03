import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const siteContent = [
  // ============ HOME PAGE ============
  { key: 'home.hero.badge', value: "Uganda's Trusted Agri-Dairy Company", type: 'TEXT', page: 'home', label: 'Hero Badge Text' },
  { key: 'home.hero.title_line1', value: 'From Farm to Table —', type: 'TEXT', page: 'home', label: 'Hero Title Line 1' },
  { key: 'home.hero.title_line2', value: 'Quality You Can Trust', type: 'TEXT', page: 'home', label: 'Hero Title Line 2 (Highlighted)' },
  { key: 'home.hero.subtitle', value: 'Musikuli Dairies Limited supplies premium dairy products and agricultural produce across Uganda. Empowering 200+ farmers. Creating jobs. Building food security.', type: 'TEXT', page: 'home', label: 'Hero Subtitle Paragraph' },
  { key: 'home.hero.image', value: '/images/hero_farm.png', type: 'IMAGE_URL', page: 'home', label: 'Hero Background Image' },
  { key: 'home.hero.btn1_text', value: 'Explore Our Products', type: 'TEXT', page: 'home', label: 'Hero Button 1 Text' },
  { key: 'home.hero.btn2_text', value: 'Request a Quote', type: 'TEXT', page: 'home', label: 'Hero Button 2 Text' },
  { key: 'home.stats.farmers', value: '200+', type: 'TEXT', page: 'home', label: 'Hero Stat: Farmers Supported' },
  { key: 'home.stats.jobs', value: '60+', type: 'TEXT', page: 'home', label: 'Hero Stat: Jobs Created' },
  { key: 'home.stats.districts', value: '3', type: 'TEXT', page: 'home', label: 'Hero Stat: Districts Covered' },

  // About Preview (Home)
  { key: 'home.about.tag', value: 'Who We Are', type: 'TEXT', page: 'home', label: 'About Section Tag' },
  { key: 'home.about.title', value: 'A Family Built on Agriculture & Dairy', type: 'TEXT', page: 'home', label: 'About Section Title' },
  { key: 'home.about.desc', value: 'Musikuli Dairies Limited was incorporated in 2023, located at Nsozibirye Village, Kigombe Parish, Luwero Sub County. Founded and managed by Mr. Ibrahim Musikuli and Mrs. Reginah Nabateregga, we deal in buying and selling agricultural produce and milk.', type: 'TEXT', page: 'home', label: 'About Section Description' },
  { key: 'home.about.image', value: '/images/founders pic.jpeg', type: 'IMAGE_URL', page: 'home', label: 'About Section Image (Founders)' },
  { key: 'home.about.experience', value: '4+ years', type: 'TEXT', page: 'home', label: 'Experience Badge Text' },
  { key: 'home.about.mission', value: 'Premier supplier of agricultural products and milk, building long-term relationships through consistent quality supply.', type: 'TEXT', page: 'home', label: 'Mission Statement' },
  { key: 'home.about.vision', value: "Market leader of affordable high-quality agro products, contributing to Uganda's economic and social development.", type: 'TEXT', page: 'home', label: 'Vision Statement' },

  // Stats Banner (Home)
  { key: 'home.banner.farmers_num', value: '200', type: 'TEXT', page: 'home', label: 'Banner Stat: Smallholder Farmers Number' },
  { key: 'home.banner.farmers_label', value: 'Smallholder Farmers', type: 'TEXT', page: 'home', label: 'Banner Stat: Smallholder Farmers Label' },
  { key: 'home.banner.jobs_num', value: '60', type: 'TEXT', page: 'home', label: 'Banner Stat: Jobs Number' },
  { key: 'home.banner.jobs_label', value: 'Direct Jobs Created', type: 'TEXT', page: 'home', label: 'Banner Stat: Jobs Label' },
  { key: 'home.banner.lives_num', value: '1,500', type: 'TEXT', page: 'home', label: 'Banner Stat: Lives Number' },
  { key: 'home.banner.lives_label', value: 'Lives Impacted', type: 'TEXT', page: 'home', label: 'Banner Stat: Lives Label' },
  { key: 'home.banner.districts_num', value: '3', type: 'TEXT', page: 'home', label: 'Banner Stat: Districts Number' },
  { key: 'home.banner.districts_label', value: 'Districts Served', type: 'TEXT', page: 'home', label: 'Banner Stat: Districts Label' },

  // Services (Home)
  { key: 'home.service_1.title', value: 'Dairy Enterprise', type: 'TEXT', page: 'home', label: 'Service 1: Title' },
  { key: 'home.service_1.desc', value: 'Buying and selling processed & unprocessed milk across Luwero, Nakaseke and Nakasongola through our retail outlet at Kasana-Luwero.', type: 'TEXT', page: 'home', label: 'Service 1: Description' },
  { key: 'home.service_1.image', value: '/images/dairy_products.png', type: 'IMAGE_URL', page: 'home', label: 'Service 1: Image' },
  { key: 'home.service_2.title', value: 'Agro-produce Enterprise', type: 'TEXT', page: 'home', label: 'Service 2: Title' },
  { key: 'home.service_2.desc', value: 'Maize, beans, rice and groundnuts sourced from our outgrower network of 200+ smallholder farmers empowered with training and market access.', type: 'TEXT', page: 'home', label: 'Service 2: Description' },
  { key: 'home.service_2.image', value: '/images/agro_produce.png', type: 'IMAGE_URL', page: 'home', label: 'Service 2: Image' },
  { key: 'home.service_3.title', value: 'Community Initiatives', type: 'TEXT', page: 'home', label: 'Service 3: Title' },
  { key: 'home.service_3.desc', value: 'Milk Collection Centres, agriculture finance, and on-farm training in dairy farming methods at our Nsozibirye zero-grazing farm.', type: 'TEXT', page: 'home', label: 'Service 3: Description' },
  { key: 'home.service_3.image', value: '/images/farmers_community.png', type: 'IMAGE_URL', page: 'home', label: 'Service 3: Image' },

  // Products (Home)
  { key: 'home.product_1.name', value: 'Fresh Milk', type: 'TEXT', page: 'home', label: 'Product 1: Name' },
  { key: 'home.product_1.desc', value: 'Processed & unprocessed', type: 'TEXT', page: 'home', label: 'Product 1: Description' },
  { key: 'home.product_1.image', value: '/images/product-milk.jpg', type: 'IMAGE_URL', page: 'home', label: 'Product 1: Image' },
  { key: 'home.product_2.name', value: 'Maize', type: 'TEXT', page: 'home', label: 'Product 2: Name' },
  { key: 'home.product_2.desc', value: 'Grade A quality', type: 'TEXT', page: 'home', label: 'Product 2: Description' },
  { key: 'home.product_2.image', value: '/images/product-maize.jpg', type: 'IMAGE_URL', page: 'home', label: 'Product 2: Image' },
  { key: 'home.product_3.name', value: 'Beans', type: 'TEXT', page: 'home', label: 'Product 3: Name' },
  { key: 'home.product_3.desc', value: 'Sun-dried & sorted', type: 'TEXT', page: 'home', label: 'Product 3: Description' },
  { key: 'home.product_3.image', value: '/images/product-beans.jpg', type: 'IMAGE_URL', page: 'home', label: 'Product 3: Image' },
  { key: 'home.product_4.name', value: 'Rice', type: 'TEXT', page: 'home', label: 'Product 4: Name' },
  { key: 'home.product_4.desc', value: 'Clean & milled', type: 'TEXT', page: 'home', label: 'Product 4: Description' },
  { key: 'home.product_4.image', value: '/images/product-rice.jpg', type: 'IMAGE_URL', page: 'home', label: 'Product 4: Image' },
  { key: 'home.product_5.name', value: 'Groundnuts', type: 'TEXT', page: 'home', label: 'Product 5: Name' },
  { key: 'home.product_5.desc', value: 'Raw & roasted', type: 'TEXT', page: 'home', label: 'Product 5: Description' },
  { key: 'home.product_5.image', value: '/images/product-groundnuts.jpg', type: 'IMAGE_URL', page: 'home', label: 'Product 5: Image' },
  { key: 'home.product_6.name', value: 'Dairy Cattle', type: 'TEXT', page: 'home', label: 'Product 6: Name' },
  { key: 'home.product_6.desc', value: 'Zero-grazing farm', type: 'TEXT', page: 'home', label: 'Product 6: Description' },
  { key: 'home.product_6.image', value: '/images/product-cattle.jpg', type: 'IMAGE_URL', page: 'home', label: 'Product 6: Image' },
  { key: 'home.product_7.name', value: 'Goats', type: 'TEXT', page: 'home', label: 'Product 7: Name' },
  { key: 'home.product_7.desc', value: 'Savannah & Mubende breeds', type: 'TEXT', page: 'home', label: 'Product 7: Description' },
  { key: 'home.product_7.image', value: '/images/product-goats.png', type: 'IMAGE_URL', page: 'home', label: 'Product 7: Image' },

  // Testimonials (Home)
  { key: 'home.testimonial_1.text', value: 'Musikuli Dairies has completely transformed how I sell my milk. The collection centre is only 3 km from my farm now. No more wastage!', type: 'TEXT', page: 'home', label: 'Testimonial 1: Quote' },
  { key: 'home.testimonial_1.name', value: 'James Ssekamatte', type: 'TEXT', page: 'home', label: 'Testimonial 1: Name' },
  { key: 'home.testimonial_1.role', value: 'Dairy Farmer, Luwero', type: 'TEXT', page: 'home', label: 'Testimonial 1: Role/Location' },
  { key: 'home.testimonial_2.text', value: 'The training in modern agronomy they provided helped me triple my maize yield. My family income has improved significantly.', type: 'TEXT', page: 'home', label: 'Testimonial 2: Quote' },
  { key: 'home.testimonial_2.name', value: 'Mary Nakato', type: 'TEXT', page: 'home', label: 'Testimonial 2: Name' },
  { key: 'home.testimonial_2.role', value: 'Smallholder Farmer, Nakaseke', type: 'TEXT', page: 'home', label: 'Testimonial 2: Role/Location' },
  { key: 'home.testimonial_3.text', value: 'Reliable supply partner. Musikuli Dairies always delivers quality agricultural produce on time. Highly recommended!', type: 'TEXT', page: 'home', label: 'Testimonial 3: Quote' },
  { key: 'home.testimonial_3.name', value: 'Robert Kiggundu', type: 'TEXT', page: 'home', label: 'Testimonial 3: Name' },
  { key: 'home.testimonial_3.role', value: 'Retail Distributor, Kampala', type: 'TEXT', page: 'home', label: 'Testimonial 3: Role/Location' },

  // Gallery (Home)
  { key: 'home.gallery_1.image', value: '/images/hero_farm.png', type: 'IMAGE_URL', page: 'home', label: 'Gallery 1: Image' },
  { key: 'home.gallery_1.caption', value: 'Our Farm — Nsozibirye, Luwero', type: 'TEXT', page: 'home', label: 'Gallery 1: Caption' },
  { key: 'home.gallery_2.image', value: '/images/dairy_products.png', type: 'IMAGE_URL', page: 'home', label: 'Gallery 2: Image' },
  { key: 'home.gallery_2.caption', value: 'Premium Dairy Products', type: 'TEXT', page: 'home', label: 'Gallery 2: Caption' },
  { key: 'home.gallery_3.image', value: '/images/agro_produce.png', type: 'IMAGE_URL', page: 'home', label: 'Gallery 3: Image' },
  { key: 'home.gallery_3.caption', value: 'Quality Agro Produce', type: 'TEXT', page: 'home', label: 'Gallery 3: Caption' },
  { key: 'home.gallery_4.image', value: '/images/farmers_community.png', type: 'IMAGE_URL', page: 'home', label: 'Gallery 4: Image' },
  { key: 'home.gallery_4.caption', value: 'Our Farmer Community', type: 'TEXT', page: 'home', label: 'Gallery 4: Caption' },
  { key: 'home.gallery_5.image', value: '/images/milk_collection.png', type: 'IMAGE_URL', page: 'home', label: 'Gallery 5: Image' },
  { key: 'home.gallery_5.caption', value: 'Milk Collection Centre', type: 'TEXT', page: 'home', label: 'Gallery 5: Caption' },
  { key: 'home.gallery_6.image', value: '/images/gallery-cows-2.jpg', type: 'IMAGE_URL', page: 'home', label: 'Gallery 6: Image' },
  { key: 'home.gallery_6.caption', value: 'Cattle Feeding — Nsozibirye Farm', type: 'TEXT', page: 'home', label: 'Gallery 6: Caption' },
  { key: 'home.gallery_7.image', value: '/images/gallery-groundnuts-bags.jpg', type: 'IMAGE_URL', page: 'home', label: 'Gallery 7: Image' },
  { key: 'home.gallery_7.caption', value: 'Premium Shelled Groundnuts', type: 'TEXT', page: 'home', label: 'Gallery 7: Caption' },

  // CTA (Home)
  { key: 'home.cta.title', value: 'Get in Touch with Us Today', type: 'TEXT', page: 'home', label: 'CTA Section Title' },
  { key: 'home.cta.subtitle', value: "Whether you need bulk agricultural produce, fresh milk supply, or partnership in our outgrower program — we're ready to serve you.", type: 'TEXT', page: 'home', label: 'CTA Section Subtitle' },

  // ============ ABOUT PAGE ============
  { key: 'about.hero.title', value: 'About Musikuli Dairies Limited', type: 'TEXT', page: 'about', label: 'Page Hero Title' },
  { key: 'about.hero.subtitle', value: 'A family-built company committed to quality, sustainability and community empowerment across Uganda.', type: 'TEXT', page: 'about', label: 'Page Hero Subtitle' },
  { key: 'about.story.text', value: 'Musikuli Dairies Limited was incorporated on the 29th of June 2023, registered under company number 80034163888407. Located at Nsozibirye Village, Kigombe Parish, Luwero Sub County, we deal in buying and selling agricultural produce and milk across the Luwero, Nakaseke, and Nakasongola districts.', type: 'TEXT', page: 'about', label: 'Company Story Text' },
  { key: 'about.mission', value: 'To be the premier supplier of agricultural products and milk, building long-term relationships with our customers through consistent supply of quality products while promoting sustainable agriculture.', type: 'TEXT', page: 'about', label: 'Mission Statement' },
  { key: 'about.vision', value: "To be the market leader of affordable high-quality agro products in Uganda, contributing to Uganda's economic and social development.", type: 'TEXT', page: 'about', label: 'Vision Statement' },
  { key: 'about.founder_1.name', value: 'Ibrahim Musikuli', type: 'TEXT', page: 'about', label: 'Founder 1: Name' },
  { key: 'about.founder_1.role', value: 'Co-Founder & Managing Director', type: 'TEXT', page: 'about', label: 'Founder 1: Role' },
  { key: 'about.founder_1.image', value: '/images/gallery-founder-farm-1.jpg', type: 'IMAGE_URL', page: 'about', label: 'Founder 1: Photo' },
  { key: 'about.founder_2.name', value: 'Reginah Nabateregga', type: 'TEXT', page: 'about', label: 'Founder 2: Name' },
  { key: 'about.founder_2.role', value: 'Co-Founder & Director', type: 'TEXT', page: 'about', label: 'Founder 2: Role' },
  { key: 'about.founder_2.image', value: '/images/founders pic.jpeg', type: 'IMAGE_URL', page: 'about', label: 'Founder 2: Photo' },
  { key: 'about.value_1', value: 'Ethics, Integrity & Excellence', type: 'TEXT', page: 'about', label: 'Core Value 1' },
  { key: 'about.value_2', value: 'Professionalism', type: 'TEXT', page: 'about', label: 'Core Value 2' },
  { key: 'about.value_3', value: 'Sustainability', type: 'TEXT', page: 'about', label: 'Core Value 3' },
  { key: 'about.value_4', value: 'Total Quality Management', type: 'TEXT', page: 'about', label: 'Core Value 4' },
  { key: 'about.value_5', value: 'Productivity', type: 'TEXT', page: 'about', label: 'Core Value 5' },
  { key: 'about.value_6', value: 'Continuous Improvement', type: 'TEXT', page: 'about', label: 'Core Value 6' },
  { key: 'about.value_7', value: 'Efficiency & Effectiveness', type: 'TEXT', page: 'about', label: 'Core Value 7' },
  { key: 'about.contact.address', value: 'Nsozibirye-Kigombe, Luwero Sub County, Luwero District, Uganda', type: 'TEXT', page: 'about', label: 'Contact: Physical Address' },
  { key: 'about.contact.pobox', value: 'P.O Box 170174, Kampala', type: 'TEXT', page: 'about', label: 'Contact: P.O Box' },
  { key: 'about.contact.phone', value: '+256 200 933 861', type: 'TEXT', page: 'about', label: 'Contact: Phone Number' },
  { key: 'about.contact.email', value: 'info@musikulidairies.com', type: 'TEXT', page: 'about', label: 'Contact: Email Address' },

  // ============ SERVICES PAGE ============
  { key: 'services.hero.title', value: 'Our Products & Services', type: 'TEXT', page: 'services', label: 'Page Hero Title' },
  { key: 'services.hero.subtitle', value: 'From dairy to agro-produce, discover the full range of quality products and community programs we offer across Uganda.', type: 'TEXT', page: 'services', label: 'Page Hero Subtitle' },
  { key: 'services.dairy.title', value: 'Dairy Enterprise', type: 'TEXT', page: 'services', label: 'Dairy Section: Title' },
  { key: 'services.dairy.desc', value: 'We buy and sell processed and unprocessed milk across Luwero, Nakaseke and Nakasongola. Our retail outlet is located at Kasana-Luwero, providing fresh dairy to local communities and bulk supply to distributors.', type: 'TEXT', page: 'services', label: 'Dairy Section: Description' },
  { key: 'services.dairy.image', value: '/images/dairy_products.png', type: 'IMAGE_URL', page: 'services', label: 'Dairy Section: Main Image' },
  { key: 'services.agro.title', value: 'Agro-produce Enterprise', type: 'TEXT', page: 'services', label: 'Agro Section: Title' },
  { key: 'services.agro.desc', value: 'We source maize, beans, rice and groundnuts from our outgrower network of 200+ smallholder farmers. Each farmer receives training and market access, ensuring quality produce and sustainable livelihoods.', type: 'TEXT', page: 'services', label: 'Agro Section: Description' },
  { key: 'services.agro.image', value: '/images/agro_produce.png', type: 'IMAGE_URL', page: 'services', label: 'Agro Section: Main Image' },
  { key: 'services.mcc.title', value: 'Milk Collection Centres', type: 'TEXT', page: 'services', label: 'MCC Section: Title' },
  { key: 'services.mcc.desc', value: 'Our Milk Collection Centres provide bulk chilling tanks, agriculture finance, and on-farm training to dairy farmers across the region. We bring market access closer to every farmer.', type: 'TEXT', page: 'services', label: 'MCC Section: Description' },
  { key: 'services.mcc.image', value: '/images/milk_collection.png', type: 'IMAGE_URL', page: 'services', label: 'MCC Section: Image' },
  { key: 'services.goat.title', value: 'Goat Enterprise', type: 'TEXT', page: 'services', label: 'Goat Section: Title' },
  { key: 'services.goat.desc', value: 'We breed and supply premium Savannah and Mubende goats. Our goat enterprise provides quality goat milk, meat and breeding stock from our Nsozibirye farm.', type: 'TEXT', page: 'services', label: 'Goat Section: Description' },
  { key: 'services.goat.image', value: '/images/goat_enterprise.png', type: 'IMAGE_URL', page: 'services', label: 'Goat Section: Image' },

  // ============ PRICING PAGE ============
  { key: 'pricing.hero.title', value: 'Transparent Pricing', type: 'TEXT', page: 'pricing', label: 'Page Hero Title' },
  { key: 'pricing.hero.subtitle', value: 'We offer fair, competitive pricing tailored to your needs — from retail customers to wholesale partners and outgrower programs.', type: 'TEXT', page: 'pricing', label: 'Page Hero Subtitle' },
  { key: 'pricing.note', value: 'Prices vary based on market rates, quantity ordered and delivery location. Contact us for a personalised quote.', type: 'TEXT', page: 'pricing', label: 'Pricing Disclaimer Note' },
  { key: 'pricing.plan_1.title', value: 'Retail Purchase', type: 'TEXT', page: 'pricing', label: 'Plan 1: Title' },
  { key: 'pricing.plan_1.price', value: 'Market Rate', type: 'TEXT', page: 'pricing', label: 'Plan 1: Price' },
  { key: 'pricing.plan_2.title', value: 'Wholesale Order', type: 'TEXT', page: 'pricing', label: 'Plan 2: Title' },
  { key: 'pricing.plan_2.price', value: 'Negotiated', type: 'TEXT', page: 'pricing', label: 'Plan 2: Price' },
  { key: 'pricing.plan_3.title', value: 'Outgrower Partner', type: 'TEXT', page: 'pricing', label: 'Plan 3: Title' },
  { key: 'pricing.plan_3.price', value: 'Tailored', type: 'TEXT', page: 'pricing', label: 'Plan 3: Price' },

  // Products table (Pricing)
  { key: 'pricing.product_1.name', value: 'Fresh Milk (Unprocessed)', type: 'TEXT', page: 'pricing', label: 'Product 1: Name' },
  { key: 'pricing.product_1.unit', value: 'Per litre', type: 'TEXT', page: 'pricing', label: 'Product 1: Unit' },
  { key: 'pricing.product_1.note', value: 'Farm gate price', type: 'TEXT', page: 'pricing', label: 'Product 1: Note' },
  
  { key: 'pricing.product_2.name', value: 'Processed Milk', type: 'TEXT', page: 'pricing', label: 'Product 2: Name' },
  { key: 'pricing.product_2.unit', value: 'Per litre', type: 'TEXT', page: 'pricing', label: 'Product 2: Unit' },
  { key: 'pricing.product_2.note', value: 'Retail / Wholesale', type: 'TEXT', page: 'pricing', label: 'Product 2: Note' },

  { key: 'pricing.product_3.name', value: 'Maize (Dry)', type: 'TEXT', page: 'pricing', label: 'Product 3: Name' },
  { key: 'pricing.product_3.unit', value: 'Per kg / Tonne', type: 'TEXT', page: 'pricing', label: 'Product 3: Unit' },
  { key: 'pricing.product_3.note', value: 'Grade A', type: 'TEXT', page: 'pricing', label: 'Product 3: Note' },

  { key: 'pricing.product_4.name', value: 'Beans', type: 'TEXT', page: 'pricing', label: 'Product 4: Name' },
  { key: 'pricing.product_4.unit', value: 'Per kg / Tonne', type: 'TEXT', page: 'pricing', label: 'Product 4: Unit' },
  { key: 'pricing.product_4.note', value: 'Sun-dried & sorted', type: 'TEXT', page: 'pricing', label: 'Product 4: Note' },

  { key: 'pricing.product_5.name', value: 'Rice', type: 'TEXT', page: 'pricing', label: 'Product 5: Name' },
  { key: 'pricing.product_5.unit', value: 'Per kg / Tonne', type: 'TEXT', page: 'pricing', label: 'Product 5: Unit' },
  { key: 'pricing.product_5.note', value: 'Clean & milled', type: 'TEXT', page: 'pricing', label: 'Product 5: Note' },

  { key: 'pricing.product_6.name', value: 'Groundnuts', type: 'TEXT', page: 'pricing', label: 'Product 6: Name' },
  { key: 'pricing.product_6.unit', value: 'Per kg / Tonne', type: 'TEXT', page: 'pricing', label: 'Product 6: Unit' },
  { key: 'pricing.product_6.note', value: 'Raw & roasted available', type: 'TEXT', page: 'pricing', label: 'Product 6: Note' },

  { key: 'pricing.product_7.name', value: 'Goat Milk', type: 'TEXT', page: 'pricing', label: 'Product 7: Name' },
  { key: 'pricing.product_7.unit', value: 'Per litre', type: 'TEXT', page: 'pricing', label: 'Product 7: Unit' },
  { key: 'pricing.product_7.note', value: 'Premium fresh goat milk', type: 'TEXT', page: 'pricing', label: 'Product 7: Note' },

  { key: 'pricing.product_8.name', value: 'Goat Meat', type: 'TEXT', page: 'pricing', label: 'Product 8: Name' },
  { key: 'pricing.product_8.unit', value: 'Per kg', type: 'TEXT', page: 'pricing', label: 'Product 8: Unit' },
  { key: 'pricing.product_8.note', value: 'Lean goat meat', type: 'TEXT', page: 'pricing', label: 'Product 8: Note' },

  { key: 'pricing.product_9.name', value: 'Goat Feed', type: 'TEXT', page: 'pricing', label: 'Product 9: Name' },
  { key: 'pricing.product_9.unit', value: 'Per kg', type: 'TEXT', page: 'pricing', label: 'Product 9: Unit' },
  { key: 'pricing.product_9.note', value: 'Nutrient-rich feed for goats', type: 'TEXT', page: 'pricing', label: 'Product 9: Note' },

  // ============ CONTACT PAGE ============
  { key: 'contact.hero.title', value: 'Get in Touch', type: 'TEXT', page: 'contact', label: 'Page Hero Title' },
  { key: 'contact.hero.subtitle', value: "We'd love to hear from you. Whether you're a farmer, buyer, investor or partner — reach out and we'll respond promptly.", type: 'TEXT', page: 'contact', label: 'Page Hero Subtitle' },
  { key: 'contact.address', value: 'Nsozibirye-Kigombe, Luwero Sub County, Luwero District, Uganda', type: 'TEXT', page: 'contact', label: 'Physical Address' },
  { key: 'contact.pobox', value: 'P.O Box 170174, Kampala', type: 'TEXT', page: 'contact', label: 'P.O Box' },
  { key: 'contact.phone', value: '+256 200 933 861', type: 'TEXT', page: 'contact', label: 'Phone Number' },
  { key: 'contact.email', value: 'info@musikulidairies.com', type: 'TEXT', page: 'contact', label: 'Email Address' },
  { key: 'contact.whatsapp', value: '256200933861', type: 'TEXT', page: 'contact', label: 'WhatsApp Number (no +)' },
  { key: 'contact.hours', value: 'Monday – Saturday: 7:00 AM – 6:00 PM', type: 'TEXT', page: 'contact', label: 'Business Hours' },
  { key: 'contact.maps_embed', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63694.11329095048!2d32.45792!3d0.8165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177bbf95671e7cc7%3A0x12e18c7938d5a4f5!2sLuwero%2C%20Uganda!5e0!3m2!1sen!2sug!4v1620000000000', type: 'TEXT', page: 'contact', label: 'Google Maps Embed URL' },

  // ============ GALLERY PAGE ============
  { key: 'gallery.hero.title', value: 'Our Gallery', type: 'TEXT', page: 'gallery', label: 'Page Hero Title' },
  { key: 'gallery.hero.subtitle', value: 'A visual journey through our farms, collection centres, products and the communities we serve across Uganda.', type: 'TEXT', page: 'gallery', label: 'Page Hero Subtitle' },
  { key: 'gallery.item_1.image', value: '/images/gallery-cows-1.jpg', type: 'IMAGE_URL', page: 'gallery', label: 'Gallery Item 1: Image' },
  { key: 'gallery.item_1.caption', value: 'Holstein Dairy Cows — Nsozibirye Farm', type: 'TEXT', page: 'gallery', label: 'Gallery Item 1: Caption' },
  { key: 'gallery.item_2.image', value: '/images/gallery-cows-2.jpg', type: 'IMAGE_URL', page: 'gallery', label: 'Gallery Item 2: Image' },
  { key: 'gallery.item_2.caption', value: 'Cattle Feeding on Silage', type: 'TEXT', page: 'gallery', label: 'Gallery Item 2: Caption' },
  { key: 'gallery.item_3.image', value: '/images/gallery-chaff-cutter.jpg', type: 'IMAGE_URL', page: 'gallery', label: 'Gallery Item 3: Image' },
  { key: 'gallery.item_3.caption', value: 'Chaff Cutter Machine in Operation', type: 'TEXT', page: 'gallery', label: 'Gallery Item 3: Caption' },
  { key: 'gallery.item_4.image', value: '/images/gallery-silage-pit.jpg', type: 'IMAGE_URL', page: 'gallery', label: 'Gallery Item 4: Image' },
  { key: 'gallery.item_4.caption', value: 'Silage Pit — Feed Storage', type: 'TEXT', page: 'gallery', label: 'Gallery Item 4: Caption' },
  { key: 'gallery.item_5.image', value: '/images/gallery-production-log.jpg', type: 'IMAGE_URL', page: 'gallery', label: 'Gallery Item 5: Image' },
  { key: 'gallery.item_5.caption', value: 'Daily Milk Production Records', type: 'TEXT', page: 'gallery', label: 'Gallery Item 5: Caption' },
  { key: 'gallery.item_6.image', value: '/images/gallery-founder-farm-1.jpg', type: 'IMAGE_URL', page: 'gallery', label: 'Gallery Item 6: Image' },
  { key: 'gallery.item_6.caption', value: 'Founder on the Farm', type: 'TEXT', page: 'gallery', label: 'Gallery Item 6: Caption' },
  { key: 'gallery.item_7.image', value: '/images/gallery-office-setup.jpg', type: 'IMAGE_URL', page: 'gallery', label: 'Gallery Item 7: Image' },
  { key: 'gallery.item_7.caption', value: 'Office Operations', type: 'TEXT', page: 'gallery', label: 'Gallery Item 7: Caption' },
  { key: 'gallery.item_8.image', value: '/images/gallery-maize-field.jpg', type: 'IMAGE_URL', page: 'gallery', label: 'Gallery Item 8: Image' },
  { key: 'gallery.item_8.caption', value: 'Maize Field — Outgrower Farm', type: 'TEXT', page: 'gallery', label: 'Gallery Item 8: Caption' },
  { key: 'gallery.item_9.image', value: '/images/gallery-napier-field.jpg', type: 'IMAGE_URL', page: 'gallery', label: 'Gallery Item 9: Image' },
  { key: 'gallery.item_9.caption', value: 'Napier Grass Field for Fodder', type: 'TEXT', page: 'gallery', label: 'Gallery Item 9: Caption' },
  { key: 'gallery.item_10.image', value: '/images/gallery-groundnuts-bags.jpg', type: 'IMAGE_URL', page: 'gallery', label: 'Gallery Item 10: Image' },
  { key: 'gallery.item_10.caption', value: 'Premium Shelled Groundnuts', type: 'TEXT', page: 'gallery', label: 'Gallery Item 10: Caption' },
  { key: 'gallery.item_11.image', value: '/images/gallery-groundnuts-packets.jpg', type: 'IMAGE_URL', page: 'gallery', label: 'Gallery Item 11: Image' },
  { key: 'gallery.item_11.caption', value: 'Packaged Groundnuts — Retail Ready', type: 'TEXT', page: 'gallery', label: 'Gallery Item 11: Caption' },
  { key: 'gallery.item_12.image', value: '/images/gallery-groundnut-paste-jars.jpg', type: 'IMAGE_URL', page: 'gallery', label: 'Gallery Item 12: Image' },
  { key: 'gallery.item_12.caption', value: 'Groundnut Paste Jars', type: 'TEXT', page: 'gallery', label: 'Gallery Item 12: Caption' },
  { key: 'gallery.item_13.image', value: '/images/gallery-produce-sorting.jpg', type: 'IMAGE_URL', page: 'gallery', label: 'Gallery Item 13: Image' },
  { key: 'gallery.item_13.caption', value: 'Agro-produce Sorting & Grading', type: 'TEXT', page: 'gallery', label: 'Gallery Item 13: Caption' },

  // ============ CAREERS PAGE ============
  { key: 'careers.hero.title', value: 'Build a Future with Musikuli Dairies', type: 'TEXT', page: 'careers', label: 'Page Hero Title' },
  { key: 'careers.hero.subtitle', value: "We're growing and looking for passionate individuals to contribute to Uganda's agri-dairy sector.", type: 'TEXT', page: 'careers', label: 'Page Hero Subtitle' },
  { key: 'careers.why_1.title', value: 'Professional Growth', type: 'TEXT', page: 'careers', label: 'Why Join Card 1: Title' },
  { key: 'careers.why_1.desc', value: "We invest in our employees' development through training, mentorship, and opportunities for advancement.", type: 'TEXT', page: 'careers', label: 'Why Join Card 1: Description' },
  { key: 'careers.why_2.title', value: 'Meaningful Impact', type: 'TEXT', page: 'careers', label: 'Why Join Card 2: Title' },
  { key: 'careers.why_2.desc', value: 'Contribute to food security, farmer empowerment, and sustainable agriculture practices in Uganda.', type: 'TEXT', page: 'careers', label: 'Why Join Card 2: Description' },
  { key: 'careers.why_3.title', value: 'Collaborative Environment', type: 'TEXT', page: 'careers', label: 'Why Join Card 3: Title' },
  { key: 'careers.why_3.desc', value: 'Work alongside a dedicated and supportive team in a dynamic and inclusive workplace.', type: 'TEXT', page: 'careers', label: 'Why Join Card 3: Description' },
];

const jobListings = [
  {
    title: 'Dairy Farm Manager',
    location: 'Luwero, Uganda',
    type: 'Full-time',
    description: 'Oversee daily operations of our Nsozibirye zero-grazing dairy farm, ensuring optimal production and animal welfare.',
    requirements: 'Minimum 3 years experience in dairy farming. Diploma or degree in Animal Science or Agriculture. Strong leadership skills.',
    salary: 'Competitive — Contact for details',
    deadline: new Date('2025-12-31'),
    isActive: true,
  },
  {
    title: 'Agro-Produce Procurement Officer',
    location: 'Luwero, Nakaseke, Nakasongola',
    type: 'Full-time',
    description: 'Manage relationships with smallholder farmers and ensure timely procurement of maize, beans, rice, and groundnuts.',
    requirements: 'Degree in Agriculture, Business or related field. Experience in supply chain or procurement. Valid driving permit.',
    salary: 'Competitive — Contact for details',
    deadline: new Date('2025-12-31'),
    isActive: true,
  },
  {
    title: 'Logistics & Distribution Assistant',
    location: 'Luwero, Uganda',
    type: 'Full-time',
    description: 'Coordinate the efficient transport and distribution of dairy products and agro-produce to various markets.',
    requirements: 'Certificate or diploma in Logistics, Business or related field. Valid driving permit preferred. Good organizational skills.',
    salary: 'Competitive — Contact for details',
    deadline: new Date('2025-12-31'),
    isActive: true,
  },
  {
    title: 'Community Outreach Coordinator',
    location: 'Luwero, Uganda',
    type: 'Part-time',
    description: 'Engage with local farming communities, organize training sessions, and support our outgrower network.',
    requirements: 'Experience working with farming communities. Good communication and facilitation skills. Fluency in Luganda required.',
    salary: 'Allowance-based',
    deadline: new Date('2025-12-31'),
    isActive: true,
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Fetch existing content keys
  console.log('Checking existing site content entries...');
  const existing = await prisma.siteContent.findMany({ select: { key: true } });
  const existingKeys = new Set(existing.map((x) => x.key));

  // Filter out items that already exist
  const newItems = siteContent.filter((item) => !existingKeys.has(item.key));

  if (newItems.length > 0) {
    console.log(`Inserting ${newItems.length} new site content entries...`);
    await prisma.siteContent.createMany({ data: newItems });
    console.log(`✅ Seeded ${newItems.length} new site content entries`);
  } else {
    console.log('ℹ️ No new site content entries to seed');
  }

  // Seed job listings (only if none exist)
  const existingJobs = await prisma.jobListing.count();
  if (existingJobs === 0) {
    await prisma.jobListing.createMany({ data: jobListings });
    console.log(`✅ Seeded ${jobListings.length} job listings`);
  } else {
    console.log(`ℹ️ Skipped job listings — ${existingJobs} already exist`);
  }

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
