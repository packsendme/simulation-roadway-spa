import { RuleInstance } from './instance-rule/ruleInstance';
import { RuleCosts } from './instance-costs/ruleCosts';

export interface RoadwayBussineRule {
    name_rule: string;
	date_creation: string;
	date_change: string;
	rate_reshipping: number;
	status: string;
	
	ruleCosts: RuleCosts;
	ruleInstance: RuleInstance;
    
}