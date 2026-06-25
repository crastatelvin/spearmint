const products = [
  {
    id: 1,
    name: "iPhone 13",
    category: "Phone",
    price: 499,
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=600&q=80",
    description: "Compact flagship with a Super Retina XDR screen, advanced dual-camera system, and durable design.",
    specs: {
      display: "6.1\" Super Retina XDR OLED",
      processor: "Apple A15 Bionic (6-core)",
      storage: "128GB NVMe",
      ram: "4GB LPDDR4X",
      camera: "Dual 12MP (Wide, Ultra-Wide)",
      battery: "3240 mAh (20W Charging)",
      weight: "174g",
      os: "iOS 15 (Upgradable)"
    }
  },
  {
    id: 2,
    name: "Samsung Galaxy A54",
    category: "Phone",
    price: 399,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    description: "Awesome 5G performance, vivid screen, and high-resolution camera for everyday creators.",
    specs: {
      display: "6.4\" Super AMOLED 120Hz",
      processor: "Exynos 1380 5G (5nm)",
      storage: "128GB (MicroSD expandable)",
      ram: "8GB LPDDR4X",
      camera: "50MP Main + 12MP Ultra + 5MP Macro",
      battery: "5000 mAh (25W Fast Charge)",
      weight: "202g",
      os: "Android 13 with One UI 5.1"
    }
  },
  {
    id: 3,
    name: "Google Pixel 7",
    category: "Phone",
    price: 450,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    description: "Powered by Google Tensor G2 for secure, fast performance and class-leading photography.",
    specs: {
      display: "6.3\" OLED 90Hz HDR10+",
      processor: "Google Tensor G2 (4nm)",
      storage: "128GB UFS 3.1",
      ram: "8GB LPDDR5",
      camera: "50MP Dual Pixel + 12MP Ultra-wide",
      battery: "4355 mAh (20W Fast Charge)",
      weight: "197g",
      os: "Android 13 (Clean Pixel Experience)"
    }
  },
  {
    id: 4,
    name: "MacBook Air M2",
    category: "Laptop",
    price: 999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    description: "Strikingly thin design, silent fanless architecture, and up to 18 hours of battery life.",
    specs: {
      display: "13.6\" Liquid Retina (2560x1664)",
      processor: "Apple M2 (8-core CPU / 8-core GPU)",
      ram: "8GB Unified Memory",
      storage: "256GB PCIe NVMe SSD",
      ports: "2x Thunderbolt 4, MagSafe 3",
      battery: "52.6 Wh Lithium-polymer",
      weight: "1.24kg (2.7 lbs)",
      os: "macOS Ventura (M2 Optimized)"
    }
  },
  {
    id: 5,
    name: "Dell Inspiron 15",
    category: "Laptop",
    price: 650,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    description: "Reliable performance for work or study, featuring a spacious display and numerical keypad.",
    specs: {
      display: "15.6\" FHD (1920x1080) Anti-Glare",
      processor: "Intel Core i5-1235U (Up to 4.4GHz)",
      ram: "16GB DDR4 3200MHz",
      storage: "512GB M.2 PCIe NVMe SSD",
      graphics: "Intel Iris Xe Graphics",
      ports: "1x USB 3.2 Gen 1 Type-C, 2x USB 3.2, HDMI",
      weight: "1.65kg (3.6 lbs)",
      os: "Windows 11 Home"
    }
  },
  {
    id: 6,
    name: "Sony WH-1000XM4",
    category: "Headphones",
    price: 349,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Industry-leading active noise canceling overhead headphones with long battery life.",
    specs: {
      drivers: "40mm Dome Type (CCAW Voice Coil)",
      anc: "HD Noise Canceling Processor QN1",
      battery: "Up to 30 hours (ANC ON)",
      connectivity: "Bluetooth 5.0, Multipoint Pair",
      codecs: "LDAC, AAC, SBC",
      weight: "254g",
      features: "Speak-to-Chat, Quick Attention Mode"
    }
  },
  {
    id: 7,
    name: "iPad Air",
    category: "Tablet",
    price: 599,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    description: "Lightweight and powerful with the M1 chip, Liquid Retina display, and Apple Pencil support.",
    specs: {
      display: "10.9\" Liquid Retina IPS LED",
      processor: "Apple M1 Chip (8-Core CPU & GPU)",
      storage: "64GB High Speed Flash",
      ram: "8GB Unified Memory",
      camera: "12MP Wide Rear + 12MP Ultra-wide Front",
      battery: "28.6 Wh (Up to 10 hours)",
      weight: "461g (1.02 lbs)",
      os: "iPadOS 15"
    }
  },
  {
    id: 8,
    name: "Apple Watch Series 9",
    category: "Smartwatch",
    price: 399,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
    description: "Advanced health sensors, bright Always-On display, and touch-free double tap gesture control.",
    specs: {
      display: "Always-On Retina LTPO OLED (2000 nits)",
      processor: "Apple S9 SiP (Dual-Core)",
      storage: "64GB Internal Storage",
      connectivity: "GPS, NFC, Bluetooth 5.3, Wi-Fi",
      water_resistance: "WR50 (Water resistant 50m)",
      sensors: "ECG, Blood Oxygen, Heart Rate, Temp",
      battery: "Up to 18 hours (Low Power to 36 hours)"
    }
  },
  {
    id: 9,
    name: "Kindle Paperwhite",
    category: "E-reader",
    price: 139,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
    description: "Glare-free screen with adjustable warm light, waterproof design, and weeks of battery life.",
    specs: {
      display: "6.8\" Paperwhite technology 300 ppi",
      storage: "16GB (Holds thousands of books)",
      waterproofing: "IPX8 (Submersion in fresh water to 2m)",
      illumination: "17 LEDs with adjustable warm light",
      battery: "Up to 10 weeks (single charge)",
      charging: "USB-C (Fully charged in 2.5 hours)",
      weight: "205g"
    }
  },
  {
    id: 10,
    name: "Nintendo Switch (OLED Model)",
    category: "Console",
    price: 299,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=600&q=80",
    description: "Vibrant 7-inch OLED screen, wide adjustable stand, wired LAN port, and 64GB of internal storage.",
    specs: {
      display: "7.0\" OLED Multi-touch capacitive screen",
      resolution: "720p (Handheld) / 1080p (TV Docked)",
      storage: "64GB (MicroSD expandable to 2TB)",
      modes: "TV Mode, Tabletop Mode, Handheld Mode",
      controllers: "Detachable Joy-Con (L/R) with Rumble",
      battery: "4.5 to 9.0 hours (4310 mAh)",
      weight: "320g (Without Joy-Cons)"
    }
  }
];

export default products;
