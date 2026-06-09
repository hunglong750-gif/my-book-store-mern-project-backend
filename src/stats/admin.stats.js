const mongoose = require('mongoose');
const express = require('express');
const Order = require('../orders/order.model');
const Book = require('../books/book.model');

const router = express.Router();

// countDocument() => Look at all => give a number base on condition
// aggregate() => Look at all => perform operations => return an array


// Function to calculate admin stats
router.get("/", async (req, res) => {
    try {
        // 1. Total number of orders (not quantity of orders)
        // When user order => it POST the order up to the order database
        // => it would count from the order database not the books
        const totalOrders = await Order.countDocuments();


        // 2. Total sales (sum of all totalPrice from orders)
        // _id: null means takes everything put into one group
        // it can be _id: {"$category"}...
        // $fieldName => read the value from fieldName
        // it returns {_id: null, totalSales: 600}
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$price" },
                }
            }
        ]);

        // 3. (1st way) Trending books statistics: 
        // $match means keep it if the trending is true
        // $count => count items and put it into the variable name "trendingBooksCount"

        //    const trendingBooksCount = await Book.aggregate([
        //       { $match: { trending: true } },  // Match only trending books
        //        { $count: "trendingBooksCount" }  // Return the count of trending books
        //    ]);
        
        // If you want just the count as a number, you can extract it like this:
        // const trendingBooks = trendingBooksCount.length > 0 ? trendingBooksCount[0].trendingBooksCount : 0;

        // 4. (2nd way)
        // Based on condition => count
        const trendingBooks = await Book.countDocuments({
            trending: true
        });

        // 5. Total number of books
        const totalBooks = await Book.countDocuments();

        // 6. Monthly sales (group by month and sum total sales for each month)
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },  // Group by year and month
                    totalSales: { $sum: "$price" },  // Sum totalPrice for each month
                    totalOrders: { $sum: 1 }  // Count total orders for each month
                }
            },
            { $sort: { _id: 1 } }  // sort it as ascending (-1 => decending)
        ]);

        // Result summary
        res.status(200).json({  totalOrders,
            // extract number in totalSales
            totalSales: totalSales[0]?.totalSales || 0,
            trendingBooks,
            totalBooks,
            monthlySales, });
      
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
})

module.exports = router;