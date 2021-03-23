import { EntityManager, getConnection } from "typeorm";
import { UserService } from "../user/user.service";

export class TreeService {
    private static INSTANCE: TreeService;
    private repository: EntityManager;

    private constructor() {
        this.repository = getConnection().manager;
    }

    public static getInstance(): TreeService {
        if (this.INSTANCE == null) {
            this.INSTANCE = new TreeService();
        }
        return this.INSTANCE;
    }

    async getAllPlantedTree() {
        return UserService.getInstance()
            .findAll()
            .then((users) => {
                return users.reduce( function(a, b){
                    return a + b["plantedTree"];
                }, 0);
            })
            .catch((error) => {});
    }
}
