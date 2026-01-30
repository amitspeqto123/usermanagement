/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile CRUD APIs
 */

/**
 * @swagger
 * /v1/profile/create:
 *   post:
 *     summary: Create user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Amit Kumar
 *               age:
 *                 type: number
 *                 example: 25
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: "Delhi, India"
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /v1/profile/userId:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 */

/**
 * @swagger
 * /v1/profile/update/userId:
 *   put:
 *     summary: Update logged-in user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Amit Kumar
 *               age:
 *                 type: number
 *                 example: 26
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: "Delhi, India"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 */

/**
 * @swagger
 * /v1/profile/delete/userId:
 *   delete:
 *     summary: Delete logged-in user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
