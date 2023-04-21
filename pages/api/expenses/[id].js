import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
	// if (req.method !== "GET") {
	// 	res.status(405).json({
	// 		message: "Method not allowed",
	// 	});
	// 	return;
	// }
	if (req.method === "GET") {
		const expense = await prisma.expense.findUnique({
			where: {
				id: parseInt(req.query.id),
			},
		});
		res.status(200).json(expense);
	}

	// if (req.method === "PATCH") {
	// 	const expenses = await prisma.trip.findMany();
	// 	res.status(200).json(trips);
	// }
}
