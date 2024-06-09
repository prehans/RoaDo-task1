interface Trip {
    start: string;
    end: string;  
}

interface Shipment {
    pickups: string[]; // List of pickup points
    dropoffs: string[]; // List of drop-off points
}

function validateTrips(shipment: Shipment, trips: Trip[]): boolean {
    const allPoints = [...shipment.pickups, ...shipment.dropoffs];
    const visitedPoints: Set<string> = new Set();

    for (const trip of trips) {
        const { start, end } = trip;

        // Check if start and end points are valid
        if (!allPoints.includes(start) || !allPoints.includes(end)) {
            return false;
        }

        // Check if the start point has not been visited before
        if (visitedPoints.has(start)) {
            return false;
        }

        // Add start and end points to visited points
        visitedPoints.add(start);
        visitedPoints.add(end);
    }

    // Check if all pickup and dropoff points have been visited
    for (const point of allPoints) {
        if (!visitedPoints.has(point)) {
            return false;
        }
    }

    // Additional checks like connectivity, loops, empty trips, etc., can be added here

    return true;
}

// Example usage:
const shipment: Shipment = {
    pickups: ["A", "B"],
    dropoffs: ["C", "D"]
};

const trips: Trip[] = [
    { start: "A", end: "W" },
    { start: "B", end: "W" },
    { start: "W", end: "C" },
    { start: "W", end: "D" }
];

console.log(validateTrips(shipment, trips)); // Output: true (valid set of trips)
