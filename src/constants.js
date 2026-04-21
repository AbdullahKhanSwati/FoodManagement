const MEAL_SIZES = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' },
];

const TEMPERATURES = [
  { id: 'hot', label: 'Hot' },
  { id: 'cold', label: 'Cold' },
  { id: 'warm', label: 'Warm' },
  { id: 'frozen', label: 'Frozen' },
];

const FOOD_TYPES = [
  { id: 'grazing', label: 'Grazing' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'liquids', label: 'Liquids' },
  { id: 'unsure', label: "I don't mind" },
];

const FOOD_CATEGORIES = [
  'Fruit',
  'Vegetable',
  'Grain',
  'Protein',
  'Dairy',
  'Other',
];

const TEMPERATURE_OPTIONS = [
  'Cold',
  'Room Temperature',
  'Warm',
  'Hot',
];

const FOOD_SUGGESTIONS = [
  {
    id: 1,
    name: 'Smoothie Bowl',
    description: 'Creamy blend of fruits and yogurt',
    type: 'Liquid/Soft',
    temperature: 'Cold',
  },
  {
    id: 2,
    name: 'Yogurt Bowl',
    description: 'Gentle and nourishing with fruits',
    type: 'Soft',
    temperature: 'Cold',
  },
  {
    id: 3,
    name: 'Toast with Honey',
    description: 'Simple and comforting',
    type: 'Solid',
    temperature: 'Warm',
  },
  {
    id: 4,
    name: 'Fruit Salad',
    description: 'Fresh and light',
    type: 'Solid',
    temperature: 'Cold',
  },
  {
    id: 5,
    name: 'Broth',
    description: 'Warm and soothing',
    type: 'Liquid',
    temperature: 'Hot',
  },
  {
    id: 6,
    name: 'Banana',
    description: 'Soft, easy to digest',
    type: 'Solid',
    temperature: 'Room Temperature',
  },
  {
    id: 7,
    name: 'Applesauce',
    description: 'Smooth and gentle',
    type: 'Liquid/Soft',
    temperature: 'Room Temperature',
  },
  {
    id: 8,
    name: 'Rice Pudding',
    description: 'Comforting and soft',
    type: 'Soft',
    temperature: 'Warm',
  },
];

const MAX_ROUTINE_STEPS = 5;

const TIMER_DEFAULT = 30;

const DRAWER_MENU_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'food-support', label: 'Food Support' },
  { id: 'safe-foods', label: 'Safe Foods' },
  { id: 'rituals', label: 'Food Routines & Rituals' },
  { id: 'journal', label: 'Journal' },
  { id: 'community', label: 'Community' },
];

const USER_MOCK = {
  id: 1,
  name: 'Sarah',
  avatar: 'S',
  email: 'sarah@example.com',
  joinDate: '2024-01-15',
};

const MESSAGES = {
  greeting: 'Good to see you',
  greetingSubtitle: 'Welcome back, Sarah',
  supportMessage: 'Take your time. This is a gentle space to support you with food, one small step at a time.',
  savedSuccessfully: 'Saved successfully!',
  deleteConfirm: 'Are you sure you want to delete this?',
  noData: 'No items yet',
  error: 'Something went wrong',
  tryAgain: 'Try Again',
};

const SCREEN_NAMES = {
  HOME: 'Home',
  MEAL_SIZE: 'MealSize',
  TEMPERATURE: 'Temperature',
  FOOD_TYPE: 'FoodType',
  SUGGESTIONS: 'Suggestions',
  SAFE_FOODS_LIST: 'SafeFoodsList',
  ADD_SAFE_FOOD: 'AddSafeFood',
  SAFE_FOOD_DETAIL: 'SafeFoodDetail',
  RITUALS_HOME: 'RitualsHome',
  CREATE_ROUTINE: 'CreateRoutine',
  EDIT_ROUTINE: 'EditRoutine',
  START_ROUTINE: 'StartRoutine',
};

module.exports = {
  MEAL_SIZES,
  TEMPERATURES,
  FOOD_TYPES,
  FOOD_CATEGORIES,
  TEMPERATURE_OPTIONS,
  FOOD_SUGGESTIONS,
  MAX_ROUTINE_STEPS,
  TIMER_DEFAULT,
  DRAWER_MENU_ITEMS,
  USER_MOCK,
  MESSAGES,
  SCREEN_NAMES,
};
