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
const initScrollAnimations = () => {
	const observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.1,
	};

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("active");
					observer.unobserve(entry.target);
				}
			});
		},
		observerOptions
	);

	const revealElements =
		document.querySelectorAll(".reveal");
	revealElements.forEach((el) =>
		observer.observe(el)
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
