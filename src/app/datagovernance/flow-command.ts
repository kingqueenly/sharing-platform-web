import {Value} from "../home/value";
import {Application} from "./application";
/**
 * Created by AMC on 2017/8/1.
 */
export class FlowCommand {

    public application: Application;
    public comments: string;
    public supervisor: string;
    public stepKey: string;
    public taskKey: string;
    public buttonName: string;
    public userId: string;
    public taskId: string;

    constructor() {

    }
}
