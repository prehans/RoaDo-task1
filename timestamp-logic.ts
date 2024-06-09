interface Device {
    logged_in: Date;
    logged_out?: Date;
    lastSeenAt: Date;
}

interface User {
    devices: Device[];
}

interface MonthlyUserStats {
    activeUsers: number;
    loggedInUsers: number;
}

function UserStats(users: User[], targetMonth: Date): MonthlyUserStats {
    let activeUsers = 0;
    let loggedInUsers = 0;

    users.forEach(user => {
        let userActiveThisMonth = false;
        let userLoggedInThisMonth = false;

        user.devices.forEach(device => {
            if (isWithinMonth(device.lastSeenAt, targetMonth)) {
                userActiveThisMonth = true;
            }
            
            if (isWithinMonth(device.logged_in, targetMonth)) {
                if (!device.logged_out || isAfterMonth(device.logged_out, targetMonth)) {
                    userLoggedInThisMonth = true;
                }
            }
        });

        if (userActiveThisMonth) {
            activeUsers++;
        }

        if (userLoggedInThisMonth) {
            loggedInUsers++;
        }
    });

    return { activeUsers, loggedInUsers };
}

function isWithinMonth(date: Date, targetMonth: Date): boolean {
    return date.getMonth() === targetMonth.getMonth() && date.getFullYear() === targetMonth.getFullYear();
}

function isAfterMonth(date: Date, targetMonth: Date): boolean {
    return date.getFullYear() > targetMonth.getFullYear() ||
           (date.getFullYear() === targetMonth.getFullYear() && date.getMonth() > targetMonth.getMonth());
}

const users: User[] = [
    {
        devices: [
            { logged_in: new Date('2024-05-01'), logged_out: new Date('2024-05-10'), lastSeenAt: new Date('2024-06-01') },
            { logged_in: new Date('2024-06-05'), lastSeenAt: new Date('2024-06-09') }
        ]
    },
    {
        devices: [
            { logged_in: new Date('2024-06-02'), lastSeenAt: new Date('2024-06-09') },
            { logged_in: new Date('2024-06-08'), lastSeenAt: new Date('2024-06-09') }
        ]
    }
];

const targetMonth = new Date('2024-06-09');
const monthlyStats = UserStats(users, targetMonth);
console.log("Active Users:", monthlyStats.activeUsers); 
console.log("Logged In Users:", monthlyStats.loggedInUsers); // Output: 2
