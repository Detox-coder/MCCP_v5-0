# 🍽️ Meal Charge Calculator

A modern web-based application for calculating shared meal expenses and grocery costs among group members. This application implements precise cost-sharing algorithms with an attractive, responsive user interface.

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Algorithm](#-algorithm)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Examples](#-examples)
- [License](#-license)

## ✨ Features

### 🎯 Core Functionality
- **Precise Cost Calculation**: Implements advanced algorithms for fair expense distribution
- **Minimum Meal Enforcement**: Automatic adjustment for members below minimum meal threshold
- **Transaction Optimization**: Minimizes the number of payment transactions needed
- **Error Handling**: Built-in precision error management (±0.5 tolerance)
- **Multi-Member Support**: Handles up to 50 members simultaneously

### 🎨 User Interface
- **Modern Design**: Gradient backgrounds with glassmorphism effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth animations and hover effects
- **Real-time Validation**: Input validation with helpful error messages
- **Progress Indicators**: Loading animations during calculations

### 📊 Results Display
- **Detailed Summary**: Overview of total expenses, rates, and calculation accuracy
- **Comprehensive Table**: Complete breakdown of individual member charges
- **Payment Transactions**: Optimized list of who pays whom and how much
- **Color-coded Results**: Visual indicators for positive/negative balances


### Live Features:
- Input member details and expenses
- Automatic minimum meal adjustment
- Real-time calculation results
- Optimized payment settlement

## 🛠 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Quick Start
1. **Download the HTML file**

```sh
   # Clone or download the repository
   git clone https://github.com/Detox-coder/MCCP_v5-0.git
   cd meal-charge-calculator
```

2. **Open in browser**

```sh
   # Simply open the HTML file in your browser
   open index.html
   # or
   double-click index.html
```

3. **Start calculating!**
   - No server setup required
   - Works completely offline
   - Cross-platform compatible

## 📖 Usage

### Step 1: Basic Setup
1. Enter the **number of members** (1-50)
2. Set the **minimum meal count** threshold
3. Click "Setup Members" to proceed

### Step 2: Member Information
For each member, provide:
- **Name**: Member's display name
- **Meal Expenses**: Amount spent on meals
- **Grocery Expenses**: Amount spent on groceries
- **Meal Count**: Number of meals consumed

### Step 3: View Results
The calculator will display:
- **Summary Dashboard**: Key metrics and totals
- **Detailed Table**: Individual member breakdown
- **Payment Transactions**: Optimized settlement plan

### Example Scenario
```
Members: 4
Minimum Meals: 35

Member 1 (ALICE):
- Meal Expenses: ₹500
- Grocery Expenses: ₹200
- Meal Count: 40

Member 2 (BOB):
- Meal Expenses: ₹300
- Grocery Expenses: ₹150
- Meal Count: 30 → (adjusted to 35)

[... and so on]
```

## 🧮 Algorithm

### Core Calculation Process

#### 1. **Input Validation & Adjustment**

```js
// Minimum meal enforcement
if (mealCount < minMeal) {
    mealCount = minMeal;
}
```

#### 2. **Rate Calculation**

```js
mealRate = totalMealExpenses / totalMealCount;
groceryRate = totalGroceryExpenses / totalMembers;
```

#### 3. **Individual Charges**

```js
member.mealCharge = member.mealCount * mealRate;
member.groceryCharge = groceryRate;
member.totalCharge = member.mealCharge + member.groceryCharge;
```

#### 4. **Balance Calculation**

```js
member.giveAndTake = member.totalExpenses - member.totalCharge;
```

#### 5. **Transaction Optimization**
- Groups members into givers (negative balance) and takers (positive balance)
- Optimizes payments to minimize transaction count
- Uses precision error handling (±0.5 tolerance)

### Mathematical Precision
- **Error Tolerance**: ±0.5 currency units
- **Floating Point Handling**: Proper rounding for currency calculations
- **Balance Verification**: Ensures total give equals total take

## 💻 Technology Stack

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with flexbox/grid
- **Vanilla JavaScript**: Pure JS implementation (no frameworks)

### Design Features
- **CSS Grid & Flexbox**: Responsive layout system
- **CSS Animations**: Smooth transitions and loading states
- **Media Queries**: Mobile-first responsive design
- **CSS Variables**: Consistent theming system

### Browser Compatibility
- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

## 📁 Project Structure

```
meal-charge-calculator/
│
├── index.html             # Main application file
├── style.css              # UI design
├── script.js              # Program logic
└── README.md              # This documentation

```

### Code Organization

```html
<!-- HTML Structure -->
<div class="container">
    <div class="header">...</div>
    <div class="content">
        <div class="form-section">...</div>  <!-- Input forms -->
        <div class="results-section">...</div> <!-- Results display -->
    </div>
</div>
```

## ⚙️ Configuration

### Customizable Constants

```js
const ERROR = 0.5;              // Precision tolerance
const MAX_MEMBERS = 50;         // Maximum members allowed
```

### Styling Variables

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --accent-color: #4facfe;
    --border-radius: 12px;
    --shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}
```

## 📊 Examples

### Sample Calculation

**Input:**
- 3 Members, Minimum 30 meals
- Alice: ₹600 meals, ₹200 grocery, 35 meals
- Bob: ₹400 meals, ₹150 grocery, 25 meals → (adjusted to 30)
- Carol: ₹300 meals, ₹100 grocery, 40 meals

**Output:**
- Meal Rate: ₹12.38/meal
- Grocery Rate: ₹150/person
- Alice owes: ₹0 (balanced)
- Bob pays Carol: ₹85.71
- Total Error: ₹0.02


## 📝 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 Amit Mondal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Support

### Common Issues
- **Calculation seems off**: Check if minimum meal adjustment is applied
- **Mobile display issues**: Ensure you're using a modern browser
- **Input validation errors**: Verify all fields are filled correctly

---

**Built with ❤️ for fair expense sharing**

*Last updated: June 2025*