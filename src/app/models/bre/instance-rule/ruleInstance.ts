import { RuleParameters } from './ruleParameters';

export interface RuleInstance {
    Walking: RuleParameters;
    Motorcycle: RuleParameters;
    Car: RuleParameters;
    Truck: RuleParameters;
    Bicycle: RuleParameters;
}