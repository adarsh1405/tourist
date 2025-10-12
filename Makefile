# Puri Tourist Package Website - Quick Setup

.PHONY: help install dev start build clean check-deps check-npm install-npm

# Default target
help:
	@echo "🏖️  Puri Tourist Package Website"
	@echo "==============================="
	@echo ""
	@echo "Quick Setup Commands:"
	@echo "  make setup     - Install Node.js/npm + dependencies and start dev server"
	@echo "  make install   - Install dependencies only (auto-installs npm if needed)"
	@echo "  make dev       - Start development server (auto-installs npm + dependencies)"
	@echo "  make build     - Build for production (auto-installs npm + dependencies)"
	@echo "  make start     - Start production server (auto-installs npm + dependencies)"
	@echo "  make clean     - Clean node_modules and package-lock.json"
	@echo ""
	@echo "🌐 Available Pages:"
	@echo "  /              - Home page with booking form and destinations"
	@echo "  /gallery       - Photo gallery with category filtering"
	@echo "  /payment-details - Payment methods and security information"
	@echo "  /terms-conditions - Terms of service and policies"
	@echo ""
	@echo "🚀 For a quick start, run: make setup"

# One-command setup: install dependencies and start dev server
setup: check-npm install dev-info
	@echo ""
	@echo "🎉 Setup complete! Starting development server..."
	@echo "🌐 Your app will be available at: http://localhost:3000"
	@echo ""
	npm run dev

# Install dependencies
install: check-npm
	@echo "📦 Installing dependencies..."
	npm install

# Start development server with info
dev-info:
	@echo "🚀 Development server will start at: http://localhost:3000"

# Start development server with auto-dependency check
dev: check-npm check-deps
	@echo "🚀 Starting development server..."
	npm run dev

# Check for npm and install if needed
check-npm:
	@command -v npm >/dev/null 2>&1 || { \
		echo "❌ npm not found. Installing Node.js and npm..."; \
		$(MAKE) install-npm; \
	}

# Install npm via Homebrew or direct download
install-npm:
	@echo "📦 Installing Node.js and npm..."
	@if command -v brew >/dev/null 2>&1; then \
		echo "🍺 Using Homebrew to install Node.js..."; \
		brew install node; \
	else \
		echo "🌐 Homebrew not found. Please install Node.js manually from https://nodejs.org/"; \
		echo "   Or install Homebrew first: /bin/bash -c \"\$$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""; \
		exit 1; \
	fi
	@echo "✅ Node.js and npm installation complete!"

# Check and install dependencies if needed
check-deps:
	@if [ ! -d "node_modules" ] || [ ! -f "package-lock.json" ]; then \
		echo "📦 Dependencies not found. Installing..."; \
		npm install; \
	else \
		echo "✅ Dependencies are already installed"; \
	fi

# Build for production with auto-dependency check
build: check-npm check-deps
	@echo "🏗️  Building for production..."
	npm run build

# Start production server with auto-dependency check
start: check-npm check-deps
	@echo "🌟 Starting production server..."
	npm run start

# Clean installation
clean:
	@echo "🧹 Cleaning installation..."
	rm -rf node_modules
	rm -f package-lock.json
	@echo "✅ Clean complete! Run 'make install' to reinstall dependencies."
