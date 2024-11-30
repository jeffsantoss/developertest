import "reflect-metadata";
import { Container } from "inversify";
import { UserRepository } from "@infra/dataprovider/dynamodb/repositories/UserRepository";

export const TYPES_REPOSITORY = {
    UserRepository: Symbol.for("UserRepository"),    
};

export const iocContainer = new Container();
iocContainer.bind<UserRepository>(TYPES_REPOSITORY.UserRepository).to(UserRepository);
console.log("TrelloCRMService registrado no container");