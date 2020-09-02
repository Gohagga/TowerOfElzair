export class InjectionContainer {
    services: Record<string, any> = {};

    registerConsumer<Type>(c: new () => Type): Injection;
    registerConsumer<Type>(c: new (container: any) => Type): Injection;
    registerConsumer<Type>(c: new (container: any, ...params: any[]) => Type, ...args: any[]): Injection;
    registerConsumer<Type>(c: new (container: any, ...params: any[]) => Type, ...args: any[]): Injection {

        print("Registering as", c.name, ...args);

        let instance = new c(this.services, ...args);
        this.services[c.name] = instance;

        return {
            as: (...asTypeNames: string[]) => {
                for (let name of asTypeNames) {
                    this.services[name] = instance;
                }
            }
        }
    }

    registerProvider<Type>(c: new () => Type): Injection;
    registerProvider<Type>(c: new (...params: any[]) => Type, ...args: any[]): Injection;
    registerProvider<Type>(c: new (...params: any[]) => Type, ...args: any[]): Injection {

        print("Registering as", c.name, ...args);

        let instance = new c(...args);
        this.services[c.name] = instance;

        return {
            as: (...asTypeNames: string[]) => {
                for (let name of asTypeNames) {
                    this.services[name] = instance;
                }
            }
        }
    }

    register(instance: any, asTypeName: string): void;
    register(instance: any, ...asTypeNames: string[]): void;
    register(instance: any, ...asTypeNames: string[]): void {

        print("Registering as", ...asTypeNames);

        for (let name of asTypeNames) {
            this.services[name] = instance;
        }
    }

    resolve<Type>(c: new (container: any) => Type): Type;
    resolve<Type>(c: new (container: any, ...params: any[]) => Type, ...args: any[]): Type;
    resolve<Type>(c: new (container: any, ...params: any[]) => Type, ...args: any[]) {
        
        let instance = new c(this.services, ...args);
        return instance;
    }

    get<Type>(type: string) {
        return this.services[type] as Type;
    }
}

export interface Injection {
    as(...asTypeNames: string[]): void;
}