import { EntityManager, getConnection } from "typeorm";
import { User } from "../user/user.entity";
import { Donation } from "./donation.entity";

export class DonationService {
    private static INSTANCE: DonationService;
    private repository: EntityManager;

    private constructor() {
        this.repository = getConnection().manager;
    }

    public static getInstance(): DonationService {
        if (this.INSTANCE == null) {
            this.INSTANCE = new DonationService();
        }
        return this.INSTANCE;
    }

    async newDonation(id: number, amount: number) {
        try {
            const user: User = await this.repository.findOne(User, id);
            const dateTime = new Date();
            const donation: Donation = new Donation(amount, dateTime, user);
            return await this.repository.save(donation);
        } catch (error) {
            throw error;
        }
    }
}
