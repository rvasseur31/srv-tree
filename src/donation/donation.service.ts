import { EntityManager, getConnection } from "typeorm";
import { UserService } from "../user/user.service";
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

    async newDonation(user_id: number, amount: number) {
        try {
            const user: User = await this.repository.findOne(User, user_id);
            const dateTime = new Date();
            const donation: Donation = new Donation(amount, dateTime, user);
            await this.repository.save(donation);
            const plantedTree = user.plantedTree + Math.trunc(amount / 15);
            return await UserService.getInstance().update(user_id, {plantedTree});
        } catch (error) {
            throw error;
        }
    }
}
