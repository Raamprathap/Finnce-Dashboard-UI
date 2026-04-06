function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

export const INITIAL_TRANSACTIONS = [
  { id: generateId(), date: '2024-08-01', description: 'Monthly Salary',          category: 'Salary',        type: 'income',  amount: 8500 },
  { id: generateId(), date: '2024-08-02', description: 'Grocery Store',            category: 'Food & Dining', type: 'expense', amount: 164.80 },
  { id: generateId(), date: '2024-08-03', description: 'Electricity Bill',         category: 'Utilities',     type: 'expense', amount: 92.00 },
  { id: generateId(), date: '2024-08-04', description: 'Petrol',                   category: 'Transportation',type: 'expense', amount: 54.00 },
  { id: generateId(), date: '2024-08-07', description: 'Freelance Logo Design',    category: 'Freelance',     type: 'income',  amount: 3200 },
  { id: generateId(), date: '2024-08-08', description: 'Restaurant',               category: 'Food & Dining', type: 'expense', amount: 58.40 },
  { id: generateId(), date: '2024-08-09', description: 'Uber Ride',                category: 'Transportation',type: 'expense', amount: 22.50 },
  { id: generateId(), date: '2024-08-10', description: 'Freelance Brand Kit',      category: 'Freelance',     type: 'income',  amount: 1800 },
  { id: generateId(), date: '2024-08-14', description: 'Gym Membership',           category: 'Fitness',       type: 'expense', amount: 49.99 },
  { id: generateId(), date: '2024-08-15', description: 'Stock Dividend',           category: 'Investment',    type: 'income',  amount: 340 },
  { id: generateId(), date: '2024-08-16', description: 'Internet Bill',            category: 'Utilities',     type: 'expense', amount: 59.99 },
  { id: generateId(), date: '2024-08-17', description: 'Coffee & Snacks',          category: 'Food & Dining', type: 'expense', amount: 34.20 },
  // Week 4 — rent + small income
  { id: generateId(), date: '2024-08-21', description: 'Rent Payment',             category: 'Housing',       type: 'expense', amount: 1800 },
  { id: generateId(), date: '2024-08-22', description: 'Clothing',                 category: 'Shopping',      type: 'expense', amount: 118.00 },
  { id: generateId(), date: '2024-08-25', description: 'Freelance Icon Pack',      category: 'Freelance',     type: 'income',  amount: 750 },
  { id: generateId(), date: '2024-08-28', description: 'Grocery Run',              category: 'Food & Dining', type: 'expense', amount: 97.30 },

  // ── September 2024 — MASSIVE INCOME SPIKE ───────────────
  // Week 1 — salary + huge contract
  { id: generateId(), date: '2024-09-01', description: 'Monthly Salary',           category: 'Salary',        type: 'income',  amount: 8500 },
  { id: generateId(), date: '2024-09-02', description: 'Major Freelance Contract', category: 'Freelance',     type: 'income',  amount: 9500 },
  { id: generateId(), date: '2024-09-03', description: 'Grocery Run',              category: 'Food & Dining', type: 'expense', amount: 178.60 },
  { id: generateId(), date: '2024-09-04', description: 'Rental Income',            category: 'Rental',        type: 'income',  amount: 1200 },
  { id: generateId(), date: '2024-09-05', description: 'Electricity Bill',         category: 'Utilities',     type: 'expense', amount: 88.00 },
  // Week 2 — big freelance burst
  { id: generateId(), date: '2024-09-09', description: 'Freelance UI Project',     category: 'Freelance',     type: 'income',  amount: 4800 },
  { id: generateId(), date: '2024-09-10', description: 'Investment Returns',       category: 'Investment',    type: 'income',  amount: 1420 },
  { id: generateId(), date: '2024-09-11', description: 'Dentist Appointment',      category: 'Healthcare',    type: 'expense', amount: 145.00 },
  { id: generateId(), date: '2024-09-12', description: 'Spotify & Netflix',        category: 'Entertainment', type: 'expense', amount: 25.98 },
  // Week 3 — another freelance spike
  { id: generateId(), date: '2024-09-16', description: 'Gym Membership',           category: 'Fitness',       type: 'expense', amount: 49.99 },
  { id: generateId(), date: '2024-09-17', description: 'Rent Payment',             category: 'Housing',       type: 'expense', amount: 1800 },
  { id: generateId(), date: '2024-09-18', description: 'Freelance Backend Dev',    category: 'Freelance',     type: 'income',  amount: 5200 },
  { id: generateId(), date: '2024-09-19', description: 'Dining Out',               category: 'Food & Dining', type: 'expense', amount: 87.30 },
  // Week 4 — winding down
  { id: generateId(), date: '2024-09-23', description: 'Amazon Shopping',          category: 'Shopping',      type: 'expense', amount: 212.40 },
  { id: generateId(), date: '2024-09-25', description: 'Internet Bill',            category: 'Utilities',     type: 'expense', amount: 59.99 },
  { id: generateId(), date: '2024-09-27', description: 'Referral Bonus',           category: 'Bonus',         type: 'income',  amount: 800 },
  { id: generateId(), date: '2024-09-29', description: 'Petrol',                   category: 'Transportation',type: 'expense', amount: 61.00 },

  // ── October 2024 — LEAN / EXPENSE-HEAVY MONTH ───────────
  // Week 1 — salary only, car trouble
  { id: generateId(), date: '2024-10-01', description: 'Monthly Salary',           category: 'Salary',        type: 'income',  amount: 8500 },
  { id: generateId(), date: '2024-10-02', description: 'Grocery Store',            category: 'Food & Dining', type: 'expense', amount: 201.70 },
  { id: generateId(), date: '2024-10-03', description: 'Car Repair',               category: 'Transportation',type: 'expense', amount: 1280.00 },
  { id: generateId(), date: '2024-10-04', description: 'Medical Checkup',          category: 'Healthcare',    type: 'expense', amount: 350.00 },
  // Week 2 — big shopping expense spike
  { id: generateId(), date: '2024-10-07', description: 'Electronics Purchase',     category: 'Shopping',      type: 'expense', amount: 1490.00 },
  { id: generateId(), date: '2024-10-08', description: 'Electricity Bill',         category: 'Utilities',     type: 'expense', amount: 110.00 },
  { id: generateId(), date: '2024-10-09', description: 'Investment Returns',       category: 'Investment',    type: 'income',  amount: 280 },
  { id: generateId(), date: '2024-10-10', description: 'Restaurant Week',          category: 'Food & Dining', type: 'expense', amount: 184.50 },
  // Week 3 — travel & education
  { id: generateId(), date: '2024-10-14', description: 'Flight Tickets',           category: 'Travel',        type: 'expense', amount: 1080.00 },
  { id: generateId(), date: '2024-10-15', description: 'Gym Membership',           category: 'Fitness',       type: 'expense', amount: 49.99 },
  { id: generateId(), date: '2024-10-16', description: 'Online Course',            category: 'Education',     type: 'expense', amount: 399.00 },
  { id: generateId(), date: '2024-10-17', description: 'Freelance Small Gig',      category: 'Freelance',     type: 'income',  amount: 650 },
  // Week 4 — rent + overspend
  { id: generateId(), date: '2024-10-21', description: 'Rent Payment',             category: 'Housing',       type: 'expense', amount: 1800 },
  { id: generateId(), date: '2024-10-22', description: 'Clothing Store',           category: 'Shopping',      type: 'expense', amount: 638.00 },
  { id: generateId(), date: '2024-10-24', description: 'Internet Bill',            category: 'Utilities',     type: 'expense', amount: 59.99 },
  { id: generateId(), date: '2024-10-26', description: 'Petrol',                   category: 'Transportation',type: 'expense', amount: 63.00 },
  { id: generateId(), date: '2024-10-29', description: 'Concert Tickets',          category: 'Entertainment', type: 'expense', amount: 245.00 },

  // ── November 2024 — BONUS + RECOVERY SPIKE ──────────────
  // Week 1 — big bonus drops
  { id: generateId(), date: '2024-11-01', description: 'Monthly Salary',           category: 'Salary',        type: 'income',  amount: 8500 },
  { id: generateId(), date: '2024-11-02', description: 'Performance Bonus',        category: 'Bonus',         type: 'income',  amount: 6500 },
  { id: generateId(), date: '2024-11-03', description: 'Grocery Store',            category: 'Food & Dining', type: 'expense', amount: 147.50 },
  { id: generateId(), date: '2024-11-04', description: 'Freelance Project',        category: 'Freelance',     type: 'income',  amount: 3400 },
  { id: generateId(), date: '2024-11-05', description: 'Electricity Bill',         category: 'Utilities',     type: 'expense', amount: 89.00 },
  // Week 2 — quiet mid-month
  { id: generateId(), date: '2024-11-08', description: 'Restaurant Dinner',        category: 'Food & Dining', type: 'expense', amount: 67.30 },
  { id: generateId(), date: '2024-11-10', description: 'Stock Dividend',           category: 'Investment',    type: 'income',  amount: 680 },
  { id: generateId(), date: '2024-11-11', description: 'Amazon Shopping',          category: 'Shopping',      type: 'expense', amount: 142.00 },
  { id: generateId(), date: '2024-11-12', description: 'Gym Membership',           category: 'Fitness',       type: 'expense', amount: 49.99 },
  // Week 3 — design sprint spike
  { id: generateId(), date: '2024-11-15', description: 'Rental Income',            category: 'Rental',        type: 'income',  amount: 1200 },
  { id: generateId(), date: '2024-11-17', description: 'Freelance Design Sprint',  category: 'Freelance',     type: 'income',  amount: 4800 },
  { id: generateId(), date: '2024-11-18', description: 'Spotify Premium',          category: 'Entertainment', type: 'expense', amount: 9.99 },
  { id: generateId(), date: '2024-11-19', description: 'Pharmacy',                 category: 'Healthcare',    type: 'expense', amount: 42.50 },
  // Week 4 — year-end advance
  { id: generateId(), date: '2024-11-22', description: 'Petrol',                   category: 'Transportation',type: 'expense', amount: 55.00 },
  { id: generateId(), date: '2024-11-23', description: 'Rent Payment',             category: 'Housing',       type: 'expense', amount: 1800 },
  { id: generateId(), date: '2024-11-25', description: 'Year-end Advance',         category: 'Bonus',         type: 'income',  amount: 2800 },
  { id: generateId(), date: '2024-11-26', description: 'Coffee Shop',              category: 'Food & Dining', type: 'expense', amount: 18.40 },
  { id: generateId(), date: '2024-11-28', description: 'Internet Bill',            category: 'Utilities',     type: 'expense', amount: 59.99 },

  // ── December 2024 — HOLIDAY BLOWOUT ─────────────────────
  // Week 1 — salary + early gifts
  { id: generateId(), date: '2024-12-01', description: 'Monthly Salary',           category: 'Salary',        type: 'income',  amount: 8500 },
  { id: generateId(), date: '2024-12-02', description: 'Grocery Run',              category: 'Food & Dining', type: 'expense', amount: 283.20 },
  { id: generateId(), date: '2024-12-03', description: 'Gift Shopping Spree',      category: 'Shopping',      type: 'expense', amount: 1240.00 },
  { id: generateId(), date: '2024-12-04', description: 'Freelance Writing',        category: 'Freelance',     type: 'income',  amount: 1600 },
  { id: generateId(), date: '2024-12-05', description: 'Holiday Streaming Bundle', category: 'Entertainment', type: 'expense', amount: 34.99 },
  // Week 2 — investment + more shopping
  { id: generateId(), date: '2024-12-09', description: 'Doctor Visit',             category: 'Healthcare',    type: 'expense', amount: 120.00 },
  { id: generateId(), date: '2024-12-10', description: 'Investment Returns',       category: 'Investment',    type: 'income',  amount: 1480 },
  { id: generateId(), date: '2024-12-11', description: 'Gas + Electricity',        category: 'Utilities',     type: 'expense', amount: 142.00 },
  { id: generateId(), date: '2024-12-12', description: 'Clothing & Gifts',         category: 'Shopping',      type: 'expense', amount: 912.50 },
  // Week 3 — Christmas surge
  { id: generateId(), date: '2024-12-16', description: 'Gym Membership',           category: 'Fitness',       type: 'expense', amount: 49.99 },
  { id: generateId(), date: '2024-12-17', description: 'Holiday Dining Out',       category: 'Food & Dining', type: 'expense', amount: 298.75 },
  { id: generateId(), date: '2024-12-18', description: 'Freelance Year-end Rush',  category: 'Freelance',     type: 'income',  amount: 2800 },
  { id: generateId(), date: '2024-12-19', description: 'Taxi & Rides',             category: 'Transportation',type: 'expense', amount: 88.00 },
  { id: generateId(), date: '2024-12-21', description: 'Christmas Gifts',          category: 'Shopping',      type: 'expense', amount: 1148.00 },
  { id: generateId(), date: '2024-12-22', description: 'Rent Payment',             category: 'Housing',       type: 'expense', amount: 1800 },
  // Week 4 — celebrations + New Year prep
  { id: generateId(), date: '2024-12-24', description: 'Christmas Dinner',         category: 'Food & Dining', type: 'expense', amount: 345.60 },
  { id: generateId(), date: '2024-12-25', description: 'Rental Income',            category: 'Rental',        type: 'income',  amount: 1200 },
  { id: generateId(), date: '2024-12-27', description: 'New Year Travel',          category: 'Travel',        type: 'expense', amount: 1390.00 },
  { id: generateId(), date: '2024-12-28', description: 'Year-end Bonus',           category: 'Bonus',         type: 'income',  amount: 1200 },
  { id: generateId(), date: '2024-12-30', description: 'Internet Bill',            category: 'Utilities',     type: 'expense', amount: 59.99 },
  { id: generateId(), date: '2024-12-31', description: 'New Year Celebration',     category: 'Entertainment', type: 'expense', amount: 510.00 },

  // ── January 2025 — RECORD INCOME ─────────────────────────
  // Week 1 — huge freelance deal
  { id: generateId(), date: '2025-01-01', description: 'Monthly Salary',           category: 'Salary',        type: 'income',  amount: 8500 },
  { id: generateId(), date: '2025-01-02', description: 'New Year Freelance Deal',  category: 'Freelance',     type: 'income',  amount: 9200 },
  { id: generateId(), date: '2025-01-03', description: 'Grocery Store',            category: 'Food & Dining', type: 'expense', amount: 162.40 },
  { id: generateId(), date: '2025-01-04', description: 'Investment Returns',       category: 'Investment',    type: 'income',  amount: 2140 },
  { id: generateId(), date: '2025-01-05', description: 'Uber Eats',                category: 'Food & Dining', type: 'expense', amount: 38.90 },
  // Week 2 — design retainer + new laptop
  { id: generateId(), date: '2025-01-08', description: 'Freelance Design Retainer',category: 'Freelance',     type: 'income',  amount: 4800 },
  { id: generateId(), date: '2025-01-09', description: 'Electricity Bill',         category: 'Utilities',     type: 'expense', amount: 95.00 },
  { id: generateId(), date: '2025-01-10', description: 'New Laptop',               category: 'Shopping',      type: 'expense', amount: 1299.00 },
  { id: generateId(), date: '2025-01-11', description: 'Gym Membership',           category: 'Fitness',       type: 'expense', amount: 49.99 },
  { id: generateId(), date: '2025-01-12', description: 'Public Transport',         category: 'Transportation',type: 'expense', amount: 42.00 },
  // Week 3 — dev sprint spike
  { id: generateId(), date: '2025-01-15', description: 'Online Course Bundle',     category: 'Education',     type: 'expense', amount: 189.00 },
  { id: generateId(), date: '2025-01-16', description: 'Rental Income',            category: 'Rental',        type: 'income',  amount: 1200 },
  { id: generateId(), date: '2025-01-18', description: 'Freelance Dev Sprint',     category: 'Freelance',     type: 'income',  amount: 6100 },
  { id: generateId(), date: '2025-01-19', description: 'Rent Payment',             category: 'Housing',       type: 'expense', amount: 1800 },
  { id: generateId(), date: '2025-01-20', description: 'Referral Commission',      category: 'Bonus',         type: 'income',  amount: 1800 },
  // Week 4 — closing out strong
  { id: generateId(), date: '2025-01-22', description: 'Dental Appointment',       category: 'Healthcare',    type: 'expense', amount: 180.00 },
  { id: generateId(), date: '2025-01-24', description: 'Software Subscriptions',   category: 'Shopping',      type: 'expense', amount: 89.00 },
  { id: generateId(), date: '2025-01-26', description: 'Freelance Bonus Milestone',category: 'Freelance',     type: 'income',  amount: 2400 },
  { id: generateId(), date: '2025-01-28', description: 'Petrol',                   category: 'Transportation',type: 'expense', amount: 58.00 },
  { id: generateId(), date: '2025-01-30', description: 'Stock Dividend',           category: 'Investment',    type: 'income',  amount: 1040 },
  { id: generateId(), date: '2025-01-31', description: 'Internet Bill',            category: 'Utilities',     type: 'expense', amount: 59.99 },
].sort((a, b) => new Date(b.date) - new Date(a.date));

export const INCOME_CATEGORIES  = ['Salary', 'Freelance', 'Investment', 'Bonus', 'Rental'];
export const EXPENSE_CATEGORIES = ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Healthcare', 'Utilities', 'Housing', 'Education', 'Travel', 'Fitness'];
export const ALL_CATEGORIES     = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
