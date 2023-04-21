import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
	if (req.method === "GET") {
		const expense = await prisma.expense.findMany();
		res.status(200).json(expense);
	}

	if (req.method === "POST") {
		const { trip, name, date, amount, currency } = req.body;

		if (!trip) {
			return res
				.status(400)
				.json({ message: "Missing required parameter : trip" });
		}
		if (!name) {
			return res
				.status(400)
				.json({ message: "Missing required parameter : Name" });
		}
		if (!amount) {
			return res
				.status(400)
				.json({ message: "Missing required parameter : amount" });
		}
		await prisma.expense.create({
			data: {
				trip,
				name,
				date,
				amount,
				currency,
			},
		});

		return res.status(201).end();
	}
	res.status(405).json({
		message: "Method not allowed",
	});
	return;
}
