import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
	if (req.method === "GET") {
		const trips = await prisma.trip.findMany();
		res.status(200).json(trips);
	}

	if (req.method === "POST") {
		const { user, name, start_date, end_date } = req.body;

		if (!user) {
			return res
				.status(400)
				.json({ message: "Missing required parameter : User" });
		}
		if (!name) {
			return res
				.status(400)
				.json({ message: "Missing required parameter : Name" });
		}
		await prisma.trip.create({
			data: {
				name,
				user,
				start_date,
				end_date,
			},
		});

		return res.status(201).end();
	}
	res.status(405).json({
		message: "Method not allowed",
	});
	return;
}
