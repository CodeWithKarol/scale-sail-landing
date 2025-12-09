// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(
	".mobile-menu-toggle"
);
const navLinks =
	document.getElementById("nav-links");
const body = document.body;

if (mobileMenuToggle) {
	mobileMenuToggle.addEventListener(
		"click",
		() => {
			const isExpanded =
				mobileMenuToggle.getAttribute(
					"aria-expanded"
				) === "true";
			mobileMenuToggle.setAttribute(
				"aria-expanded",
				!isExpanded
			);
			navLinks.classList.toggle("active");
			body.classList.toggle("mobile-menu-open");
		}
	);
}

// Close mobile menu when clicking a link
const mobileLinks =
	document.querySelectorAll(".nav-link");
mobileLinks.forEach((link) => {
	link.addEventListener("click", () => {
		navLinks.classList.remove("active");
		body.classList.remove("mobile-menu-open");
		mobileMenuToggle.setAttribute(
			"aria-expanded",
			"false"
		);
	});
});

// Header Scroll Effect
const header = document.querySelector(
	".site-header"
);
window.addEventListener("scroll", () => {
	if (window.scrollY > 50) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}
});

// Smooth scroll behavior for anchor links
if (
	"scrollBehavior" in
	document.documentElement.style
) {
	document.documentElement.style.scrollBehavior =
		"smooth";
}

// Intersection Observer for scroll-triggered animations
let scrollObserver;

const initScrollAnimations = () => {
	const observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.1,
	};

	scrollObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("active");
					observer.unobserve(entry.target);

					// Remove reveal class after animation to restore original transitions (e.g. hover effects)
					setTimeout(() => {
						entry.target.classList.remove(
							"reveal",
							"active"
						);
					}, 1500);
				}
			});
		},
		observerOptions
	);

	const revealElements =
		document.querySelectorAll(".reveal");
	revealElements.forEach((el) =>
		scrollObserver.observe(el)
	);
};

// Initialize on DOM ready
if (document.readyState === "loading") {
	document.addEventListener(
		"DOMContentLoaded",
		initScrollAnimations
	);
} else {
	initScrollAnimations();
}

// Product Dialog Functionality
const productDialog = document.getElementById(
	"product-dialog"
);
const panelBackdrop = productDialog.querySelector(
	".panel-backdrop"
);
const panelClose = productDialog.querySelector(
	".panel-close"
);
const panelContent = productDialog.querySelector(
	".panel-content"
);
const panelHandleWrapper =
	productDialog.querySelector(
		".panel-handle-wrapper"
	);

// Touch handling for mobile swipe to close
let touchStartY = 0;
let touchCurrentY = 0;
let isDragging = false;

if (panelHandleWrapper) {
	panelHandleWrapper.addEventListener(
		"touchstart",
		(e) => {
			touchStartY = e.touches[0].clientY;
			isDragging = true;
		},
		{ passive: true }
	);

	document.addEventListener(
		"touchmove",
		(e) => {
			if (
				!isDragging ||
				!productDialog.classList.contains(
					"active"
				)
			)
				return;

			touchCurrentY = e.touches[0].clientY;
			const deltaY = touchCurrentY - touchStartY;

			// Only allow downward dragging
			if (deltaY > 0) {
				const panel = productDialog.querySelector(
					".panel-container"
				);
				panel.style.transform = `translateY(${deltaY}px)`;
				panel.style.transition = "none";
			}
		},
		{ passive: true }
	);

	document.addEventListener("touchend", (e) => {
		if (
			!isDragging ||
			!productDialog.classList.contains("active")
		)
			return;

		const deltaY = touchCurrentY - touchStartY;
		const panel = productDialog.querySelector(
			".panel-container"
		);

		// Close if dragged down more than 150px
		if (deltaY > 150) {
			closeProductDialog();
		} else {
			// Snap back
			panel.style.transform = "";
			panel.style.transition = "";
		}

		isDragging = false;
		touchStartY = 0;
		touchCurrentY = 0;
	});
}

// Product data
const productsData = {
	"smartcare-home": {
		title: "SmartCare Home",
		category: "Health Tech",
		rating: "5.0",
		description:
			"Professionally designed website template tailored for companies offering smart home health and safety solutions, especially for seniors and families. This template helps you quickly create a visually appealing, trustworthy site that highlights innovation and compassion.",
		image: "smartcare-home.webp",
		badge: "new",
		price: "$9.99",
		previewLink:
			"https://www.smart-care-home.scale-sail.io/",
		buyLink:
			"https://karolmodelski.gumroad.com/l/jqqmzw",
		features: [
			"Mobile-first responsive design across all devices",
			"Modern, soothing design with calming blue & green accents",
			"WCAG 2.1 AA accessibility compliance",
			"SEO optimized with semantic HTML & meta tags",
			"Fast loading with optimized CSS & lazy loading",
		],
	},
	"skillswap-hub": {
		title: "SkillSwap Hub",
		category: "Education",
		rating: "4.9",
		description:
			"Clean, modern website template designed for skill-sharing and community-driven learning platforms. It offers an inviting user experience with engaging animations and intuitive layout, perfect for connecting learners and experts in an interactive online environment.",
		image: "skillswap-hub.webp",
		badge: "popular",
		price: "$9.99",
		previewLink:
			"https://www.skill-swap.scale-sail.io/",
		buyLink:
			"https://karolmodelski.gumroad.com/l/ccept",
		features: [
			"Smooth fade, slide & scale animations",
			"Interactive How It Works section with custom SVG icons",
			"Featured Skills Showcase & Community forums",
			"Modern sign-up form with skill category selection",
			"WCAG AA compliant with keyboard navigation",
		],
	},
	innovatetech: {
		title: "InnovateTech",
		category: "AI & Tech",
		rating: "4.8",
		description:
			"Sleek, minimalist template tailored for AI-driven educational platforms. It offers fluid typography, vibrant animations, and a clean design that caters to students, teachers, and parents alike—helping you create an engaging online presence that converts visitors into users effortlessly.",
		image: "innovatetech.webp",
		badge: "",
		price: "$9.99",
		previewLink:
			"https://www.innovate-tech.scale-sail.io/",
		buyLink:
			"https://karolmodelski.gumroad.com/l/anumr",
		features: [
			"Interactive neural network animation",
			"Fluid typography with CSS clamp() scaling",
			"Zero dependencies - lightweight & fast",
			"Lazy loading images with throttled events",
			"Comprehensive sections: Hero, Benefits, Video Demo, Pricing",
		],
	},
	ecovest: {
		title: "EcoVest",
		category: "Finance",
		rating: "5.0",
		description:
			"Modern, fully responsive website template crafted for financial apps that emphasize sustainability and social impact. It features a clean, eco-friendly design that speaks directly to users looking to invest with meaning, helping you attract and convert socially conscious customers fast.",
		image: "ecovest.webp",
		badge: "",
		price: "$9.99",
		previewLink:
			"https://www.eco-vest.scale-sail.io/",
		buyLink:
			"https://karolmodelski.gumroad.com/l/lqyffs",
		features: [
			"Eco-friendly green & earth tone color palette",
			"Three-step process with custom SVG icons",
			"Frosted glass testimonial cards with 5-star ratings",
			"Smooth scroll-triggered entrance animations",
			"Zero dependencies - pure HTML5, CSS3, JavaScript",
		],
	},
	"cleanfleet-solutions": {
		title: "CleanFleet Solutions",
		category: "Electric Fleet",
		rating: "5.0",
		description:
			"Sleek, dark-themed website template designed for businesses leading the shift to sustainable electric fleets. It combines advanced UI/UX with smooth animations and glassmorphism effects to present your brand as innovative and professional, helping you convert visitors into loyal customers quickly.",
		image: "cleanfleet-solutions.webp",
		badge: "",
		price: "$9.99",
		previewLink:
			"https://www.clean-fleet.scale-sail.io/",
		buyLink:
			"https://karolmodelski.gumroad.com/l/rqxkhj",
		features: [
			"Modern dark theme with glassmorphism effects",
			"Interactive ROI calculator with real-time savings",
			"Gradient accent system (green to cyan)",
			"Smooth animations: float, hover lift, pulse effects",
			"WCAG 2.1 AA accessible with semantic HTML",
		],
	},
	mintly: {
		title: "Mintly",
		category: "AI Finance",
		rating: "5.0",
		description:
			"Sleek, professional, and completely FREE website template crafted for AI-driven personal finance apps. With clean design, dynamic animations, and comprehensive content sections, this template helps you present your product's value clearly while building trust and engagement effortlessly.",
		image: "mintly.webp",
		badge: "free",
		price: "Free",
		previewLink:
			"https://www.mintly.scale-sail.io/",
		buyLink:
			"https://karolmodelski.gumroad.com/l/elqnvn",
		features: [
			"100% FREE - No cost at all",
			"GPU-accelerated animations at 60fps",
			"Frosted glass chat widget with quick replies",
			"Responsive: 360px mobile to 2560px desktop",
			"Performance optimized with minimal file sizes",
		],
	},
	budgy: {
		title: "Budgy",
		category: "AI Finance",
		rating: "5.0",
		description:
			"Premium, fully responsive template designed for AI-driven financial coaching applications. With its clean bento grid layout, floating animations, and professional trust elements, this template helps fintech startups showcase features, build credibility, and drive sign-ups effortlessly.",
		image: "budgy.webp",
		badge: "new",
		price: "$9.99",
		previewLink:
			"https://www.budgy.scale-sail.io/",
		buyLink:
			"https://karolmodelski.gumroad.com/l/rqjofn",
		features: [
			"9-breakpoint responsive design (320px-1280px)",
			"Modern glassmorphism with backdrop blur effects",
			"Interactive bento grid with 5 smart feature cards",
			"Video showcase with YouTube modal player",
			"Trust & security badges (SOC2, AES-256)",
		],
	},
	coinquest: {
		title: "CoinQuest",
		category: "Gamified Finance",
		rating: "4.9",
		description:
			"Vibrant, modern template designed for gamified financial apps that make money management exciting and competitive. Featuring neon aesthetics, smooth animations, leaderboards, and social proof, it perfectly showcases AI-powered savings tools while converting visitors into active community members.",
		image: "coinquest.webp",
		badge: "popular",
		price: "$9.99",
		previewLink:
			"https://www.coin-quest.scale-sail.io/",
		buyLink:
			"https://karolmodelski.gumroad.com/l/cjggfe",
		features: [
			"Gamified neon design (cyan, pink, green palette)",
			"Interactive leaderboard with real-time rankings",
			"Achievement badges & community metrics",
			"Advanced scroll animations with spring easing",
			"GPU-accelerated transforms at 60fps",
		],
	},
};

// Open dialog function
function openProductDialog(productKey) {
	const product = productsData[productKey];
	if (!product) return;

	// Populate dialog content
	document.getElementById("dialog-image").src =
		product.image;
	document.getElementById("dialog-image").alt =
		product.title;
	document.getElementById(
		"dialog-category"
	).textContent = product.category;
	document.getElementById(
		"dialog-rating"
	).textContent = product.rating;
	document.getElementById(
		"dialog-title"
	).textContent = product.title;
	document.getElementById(
		"dialog-description"
	).textContent = product.description;
	document.getElementById(
		"dialog-price"
	).textContent = product.price;
	document.getElementById(
		"dialog-preview-link"
	).href = product.previewLink;
	document.getElementById(
		"dialog-buy-link"
	).href = product.buyLink;

	// Set badge
	const badgeElement = document.getElementById(
		"dialog-badge"
	);
	if (product.badge) {
		badgeElement.textContent = product.badge;
		badgeElement.className = `panel-badge ${product.badge}`;
		badgeElement.style.display = "block";
	} else {
		badgeElement.style.display = "none";
	}

	// Update buy button text for free products
	const buyButton = document.getElementById(
		"dialog-buy-link"
	);
	if (product.price === "Free") {
		buyButton.textContent = "Download";
	} else {
		buyButton.textContent = "Buy Now";
	}

	// Populate features
	const featuresList = document.getElementById(
		"dialog-features-list"
	);
	featuresList.innerHTML = "";
	product.features.forEach((feature) => {
		const li = document.createElement("li");
		li.textContent = feature;
		featuresList.appendChild(li);
	});

	// Show dialog
	productDialog.classList.add("active");
	document.body.style.overflow = "hidden";
	document.body.classList.add("dialog-open");
}

// Open Gumroad product dialog
function openGumroadProductDialog(product) {
	// Populate dialog content
	document.getElementById("dialog-image").src =
		product.preview_url || product.thumbnail_url;
	document.getElementById("dialog-image").alt =
		product.name;

	const categoryContainer =
		document.getElementById("dialog-category");
	categoryContainer.innerHTML = "";

	if (product.tags && product.tags.length > 0) {
		product.tags.forEach((tag) => {
			const tagSpan =
				document.createElement("span");
			tagSpan.textContent = tag;
			tagSpan.className = "panel-category";
			categoryContainer.appendChild(tagSpan);
		});
	} else {
		const defaultSpan =
			document.createElement("span");
		defaultSpan.textContent = "Product";
		defaultSpan.className = "panel-category";
		categoryContainer.appendChild(defaultSpan);
	}

	// Gumroad API doesn't provide rating, defaulting to 5.0 or hiding
	document.getElementById(
		"dialog-rating"
	).textContent = "5.0";

	document.getElementById(
		"dialog-title"
	).textContent = product.name;

	// Parse description to extract features and plain text
	const tempDiv = document.createElement("div");
	tempDiv.innerHTML = product.description;

	// Extract Live Demo URL if available
	const liveDemoLink = tempDiv.querySelector(
		"a.tiptap__button"
	);
	let livePreviewUrl = product.preview_url;
	if (liveDemoLink && liveDemoLink.href) {
		livePreviewUrl = liveDemoLink.href;
		liveDemoLink.remove();
	}

	// Extract features from the first ul found
	const features = [];
	const ul = tempDiv.querySelector("ul");
	if (ul) {
		ul.querySelectorAll("li").forEach((li) => {
			features.push(li.textContent.trim());
		});
		ul.remove();
	}

	// Clean up headings and HRs to get a cleaner description
	tempDiv
		.querySelectorAll(
			"h1, h2, h3, h4, h5, h6, hr"
		)
		.forEach((el) => el.remove());

	// Get the remaining text, which should be primarily the intro description
	const plainDescription =
		tempDiv.textContent ||
		tempDiv.innerText ||
		"";
	// Use a slightly longer limit for the dialog, or full text if it's reasonable
	document.getElementById(
		"dialog-description"
	).textContent = plainDescription.trim();

	document.getElementById(
		"dialog-price"
	).textContent = product.formatted_price;

	const previewLink = document.getElementById(
		"dialog-preview-link"
	);
	if (livePreviewUrl) {
		previewLink.href = livePreviewUrl;
		previewLink.style.display = "inline-flex";
	} else {
		previewLink.style.display = "none";
	}

	document.getElementById(
		"dialog-buy-link"
	).href = product.short_url;

	// Set badge (logic can be improved based on product data)
	const badgeElement = document.getElementById(
		"dialog-badge"
	);
	// Example: Check if new or popular based on tags or name
	if (
		product.tags &&
		product.tags.includes("new")
	) {
		badgeElement.textContent = "New";
		badgeElement.className = "panel-badge new";
		badgeElement.style.display = "block";
	} else {
		badgeElement.style.display = "none";
	}

	// Update buy button text for free products
	const buyButton = document.getElementById(
		"dialog-buy-link"
	);
	if (
		product.price === 0 ||
		product.formatted_price.includes("0+")
	) {
		buyButton.textContent = "Download";
	} else {
		buyButton.textContent = "Buy Now";
	}

	// Populate features
	const featuresList = document.getElementById(
		"dialog-features-list"
	);
	featuresList.innerHTML = "";
	if (features.length > 0) {
		features.forEach((feature) => {
			const li = document.createElement("li");
			li.textContent = feature;
			featuresList.appendChild(li);
		});
	} else {
		// Fallback if no features found in description
		const li = document.createElement("li");
		li.textContent = "High quality template";
		featuresList.appendChild(li);
	}

	// Show dialog
	productDialog.classList.add("active");
	document.body.style.overflow = "hidden";
	document.body.classList.add("dialog-open");
}

// Close dialog function
function closeProductDialog() {
	productDialog.classList.remove("active");
	document.body.style.overflow = "";
	document.body.classList.remove("dialog-open");

	// Reset panel transform for next open
	setTimeout(() => {
		const panel = productDialog.querySelector(
			".panel-container"
		);
		if (panel) {
			panel.style.transform = "";
			panel.style.transition = "";
		}
	}, 300);
}

// Add click event to all product cards
document
	.querySelectorAll(".product-card")
	.forEach((card, index) => {
		const productKeys = Object.keys(productsData);
		const productKey = productKeys[index];

		card.addEventListener("click", (e) => {
			// Don't open dialog if clicking on a link
			if (e.target.closest("a")) return;
			openProductDialog(productKey);
		});

		// Add keyboard support
		card.setAttribute("tabindex", "0");
		card.addEventListener("keypress", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				openProductDialog(productKey);
			}
		});
	});

// Close dialog on backdrop click
panelBackdrop.addEventListener(
	"click",
	closeProductDialog
);

// Close dialog on close button click
panelClose.addEventListener(
	"click",
	closeProductDialog
);

// Close dialog on Escape key
document.addEventListener("keydown", (e) => {
	if (
		e.key === "Escape" &&
		productDialog.classList.contains("active")
	) {
		closeProductDialog();
	}
});

// Fetch Blog Posts
async function fetchBlogPosts() {
	const blogGrid =
		document.querySelector(".blog-grid");
	if (!blogGrid) return;

	try {
		const response = await fetch(
			"https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40karol-modelski"
		);
		const data = await response.json();

		if (
			data.status === "ok" &&
			data.items.length > 0
		) {
			blogGrid.innerHTML = ""; // Clear existing content

			// Take only the first 3 items
			const posts = data.items.slice(0, 3);

			posts.forEach((post) => {
				// Format date
				const date = new Date(post.pubDate);
				const formattedDate =
					date.toLocaleDateString("en-US", {
						year: "numeric",
						month: "short",
						day: "numeric",
					});

				// Strip HTML from description and truncate
				const tempDiv =
					document.createElement("div");
				tempDiv.innerHTML = post.description;
				const textContent =
					tempDiv.textContent ||
					tempDiv.innerText ||
					"";
				const excerpt =
					textContent.length > 100
						? textContent.substring(0, 100) +
						  "..."
						: textContent;

				// Get image (thumbnail or first image in content)
				let imageUrl = post.thumbnail;
				if (!imageUrl) {
					const imgMatch = post.description.match(
						/<img[^>]+src="([^">]+)"/
					);
					if (imgMatch) {
						imageUrl = imgMatch[1];
					}
				}
				// Fallback image if none found
				if (!imageUrl) {
					imageUrl =
						"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80";
				}

				// Create blog card
				const article =
					document.createElement("a");
				article.href = post.link;
				article.className = "blog-card";
				article.target = "_blank"; // Open in new tab since it's external
				article.rel = "noopener noreferrer";

				article.innerHTML = `
                    <div class="blog-image" style="background-image: url('${imageUrl}'); background-size: cover;"></div>
                    <div class="blog-content">
                        <span class="blog-tag">${
													post.categories.length >
													0
														? post.categories[0]
														: "Blog"
												}</span>
                        <h3 class="blog-title">${
													post.title
												}</h3>
                        <p class="blog-excerpt">${excerpt}</p>
                        <div class="blog-meta">
                            <span>${formattedDate}</span>
                            <span>${
															post.author
														}</span>
                        </div>
                    </div>
                `;

				blogGrid.appendChild(article);
			});
		}
	} catch (error) {
		console.error(
			"Error fetching blog posts:",
			error
		);
	}
}

// Call the function
fetchBlogPosts();

async function fetchGumroadProducts() {
	const accessToken =
		"VIK5oqu0ZuxUBaFDYXKBhlnmtMol7eF0XJNVTQy8LSU";
	const url = `https://api.gumroad.com/v2/products?access_token=${accessToken}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (data.success) {
			console.log(
				"Gumroad Products:",
				data.products
			);
			renderProducts(data.products);
		} else {
			console.error(
				"Failed to fetch Gumroad products:",
				data.message
			);
		}
	} catch (error) {
		console.error(
			"Error fetching Gumroad products:",
			error
		);
	}
}

function renderProducts(products) {
	const productsGrid = document.querySelector(
		".products-grid"
	);
	if (!productsGrid) return;

	// Clear existing static content
	productsGrid.innerHTML = "";

	products.forEach((product, index) => {
		if (!product.published) return;

		const delay = (index % 3) + 1; // Stagger delay 1, 2, 3
		const category =
			product.tags && product.tags.length > 0
				? product.tags[0]
				: "Product";

		// Create a temporary element to strip HTML from description
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = product.description;

		// Extract Live Demo URL from description if available
		const liveDemoLink = tempDiv.querySelector(
			"a.tiptap__button"
		);
		let livePreviewUrl = product.preview_url;
		if (liveDemoLink && liveDemoLink.href) {
			livePreviewUrl = liveDemoLink.href;
			// Remove the button text from the description preview
			liveDemoLink.remove();
		}

		const plainDescription =
			tempDiv.textContent ||
			tempDiv.innerText ||
			"";
		const shortDescription =
			plainDescription.length > 100
				? plainDescription.substring(0, 100) +
				  "..."
				: plainDescription;

		const article =
			document.createElement("article");
		article.className = `product-card reveal stagger-delay-${delay}`;

		article.innerHTML = `
            <div class="card-image-wrapper">
                <img
                    src="${product.thumbnail_url}"
                    alt="${product.name}"
                    loading="lazy"
                    class="card-image"
                />
                <div class="card-overlay">
                    ${
											livePreviewUrl
												? `<a href="${livePreviewUrl}" target="_blank" class="btn-glass">Live Preview</a>`
												: ""
										}
                </div>
            </div>
            <div class="card-content">
                <div class="card-meta">
                    <span class="category">${category}</span>
                </div>
                <h3 class="card-title">
                    ${product.name}
                </h3>
                <p class="card-description">
                    ${shortDescription}
                </p>
                <div class="card-footer">
                    <div class="price-wrapper">
                        <span class="price">${
													product.formatted_price
												}</span>
                    </div>
                    <div class="card-actions">
                        <a
                            href="${
															product.short_url
														}"
                            target="_blank"
                            class="btn-sm btn-primary"
                        >Buy Now</a>
                    </div>
                </div>
            </div>
        `;

		// Add click event to open dialog
		article.addEventListener("click", (e) => {
			// Prevent opening dialog if clicking on links
			if (
				e.target.tagName === "A" ||
				e.target.closest("a")
			)
				return;
			fetchAndOpenProductDialog(product.id);
		});

		productsGrid.appendChild(article);

		if (
			typeof scrollObserver !== "undefined" &&
			scrollObserver
		) {
			scrollObserver.observe(article);
		} else {
			article.classList.add("active");
		}
	});
}

async function fetchAndOpenProductDialog(
	productId
) {
	const accessToken =
		"VIK5oqu0ZuxUBaFDYXKBhlnmtMol7eF0XJNVTQy8LSU";
	const url = `https://api.gumroad.com/v2/products/${productId}?access_token=${accessToken}`;

	try {
		// Show loading state if needed (optional)
		document.body.style.cursor = "wait";

		const response = await fetch(url);
		const data = await response.json();

		document.body.style.cursor = "default";

		if (data.success) {
			openGumroadProductDialog(data.product);
		} else {
			console.error(
				"Failed to fetch product details:",
				data.message
			);
		}
	} catch (error) {
		document.body.style.cursor = "default";
		console.error(
			"Error fetching product details:",
			error
		);
	}
}

// Call the function to fetch Gumroad products
fetchGumroadProducts();
