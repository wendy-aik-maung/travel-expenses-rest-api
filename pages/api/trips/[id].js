import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
	// if (req.method !== "GET") {
	// 	res.status(405).json({
	// 		message: "Method not allowed",
	// 	});
	// 	return;
	// }
	if (req.method === "GET") {
		const trip = await prisma.trip.findUnique({
			where: {
				id: parseInt(req.query.id),
			},
		});
		res.status(200).json(trip);
	}

	if (req.method === "PATCH") {
		const { user, name, start_date, end_date } = req.body;
		await prisma.trip.update({
			data: {
				name,
				user,
				start_date,
				end_date,
			},
			where: {
				id: parseInt(req.query.id),
			},
		});

		return res.status(200).end();
	}
}
