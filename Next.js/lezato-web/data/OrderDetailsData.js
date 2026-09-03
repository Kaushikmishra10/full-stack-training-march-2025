const OrderDetailData = {
  1: {
    orderId: "#1",
    timeline: [
      {
        label: "Order Created",
        time: "Thu, 21 Jul 2020, 11:49 AM",
        done: true,
      },
      {
        label: "Payment Success",
        time: "Fri, 22 Jul 2020, 10:44 AM",
        done: true,
      },
      { label: "On Delivery", time: "Sat, 23 Jul 2020, 01:34 PM", done: true },
      { label: "Order Delivered", time: null, done: false },
      { label: "Give Review", time: null, done: false },
    ],
    customer: {
      name: "Roberto Carlos",
      phone: "+51 5125 626 77",
      address: "Franklin Avenue St., London, ABC 12345, United Kingdom",
    },
    noteOrder:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    deliveryGuy: {
      name: "Louis Simatupang",
      id: "ID 412455",
    },
    estimatedTime: "10-14 Min",
    items: [
      {
        id: 1,
        category: "MAIN COURSE",
        name: "Chicken curry special with cucumber",
        rating: 4,
        reviews: 456,
        qty: 3,
        price: "$14.99",
        total: "$44.97",
      },
      {
        id: 2,
        category: "MAIN COURSE",
        name: "Italiano pizza with garlic",
        rating: 4,
        reviews: 456,
        qty: 1,
        price: "$15.44",
        total: "$15.44",
      },
      {
        id: 3,
        category: "MAIN COURSE",
        name: "Watermelon juice with ice",
        rating: 4,
        reviews: 456,
        qty: 1,
        price: "$4.12",
        total: "$4.12",
      },
    ],
    favourites: [
      { label: "Pizza", percent: 40, count: 28, color: "#7c5cbf" },
      { label: "Juice", percent: 53, count: 60, color: "#f97316" },
      { label: "Dessert", percent: 20, count: 7, color: "#38bdf8" },
    ],
  },
};

const defaultDetail = {
  orderId: "#000000000",
  timeline: [
    { label: "Order Created", time: "26 March 2020, 12:42 AM", done: true },
    { label: "Payment Success", time: "26 March 2020, 01:00 AM", done: true },
    { label: "On Delivery", time: null, done: false },
    { label: "Order Delivered", time: null, done: false },
    { label: "Give Review", time: null, done: false },
  ],
  customer: {
    name: "Customer",
    phone: "+44 0000 000 00",
    address: "London, United Kingdom",
  },
  noteOrder: "No additional notes for this order.",
  deliveryGuy: {
    name: "John Driver",
    id: "ID 000000",
  },
  estimatedTime: "15-20 Min",
  items: [],
  favourites: [
    { label: "Pizza", percent: 40, count: 28, color: "#7c5cbf" },
    { label: "Juice", percent: 53, count: 60, color: "#f97316" },
    { label: "Dessert", percent: 20, count: 7, color: "#38bdf8" },
  ],
};

export { defaultDetail };
export default OrderDetailData;
