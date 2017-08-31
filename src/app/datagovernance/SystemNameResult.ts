/**
 * Created by AMC on 2017/8/10.
 */
export class SystemNameResult {
    constructor(
        public id: string,
        public text: string,
        public entityName: string,
        public functionName: string,
        public dataOwner: string,
        public dataOwnerId: string,
        public itOwner: string,
        public itOwnerId: string) {

    }
}
