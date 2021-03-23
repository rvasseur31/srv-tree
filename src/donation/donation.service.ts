import { EntityManager, getConnection } from "typeorm";
import { User } from "../user/user.entity";
import { Donation } from "./donation.entity";

export class DonationService {
    private static INSTANCE: DonationService;
    private userRepository: EntityManager;

    private constructor() {
        this.userRepository = getConnection().manager;
    }

    public static getInstance(): DonationService {
        if (this.INSTANCE == null) {
            this.INSTANCE = new DonationService();
        }
        return this.INSTANCE;
    }

    async newDonation(id: number, amount: number) {
        try {
            const dateTime = new Date();
            const donation: Donation = new Donation(amount, dateTime);
            const user: User = await this.userRepository.findOne(User, id);
            return user;
        } catch (error) {
            throw error;
        }
    }
}
