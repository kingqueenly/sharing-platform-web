import {Value} from "../home/value";
/**
 * Created by AMC on 2017/8/1.
 */
export class Application {

    public id: string;
    public systemNames: Value[] = [];
    public dataTypes: Value[] = [];
    public dataObtained: string = "";
    public canTrack: boolean = false;
    public consentTerm: string = "";
    public customerConsentObtained: boolean = false;
    public anonymous: boolean = false;
    public aggregated: boolean = false;
    public systemLocations: Value[] = [];
    public useOfData: string = "";
    //Involving personal data?
    public ipd: boolean = false;
    //Involving company data?
    public icd: boolean = false;

    //Will the requested data be anonymized or aggregated prior to receipt?
    public aaptr: boolean = false;
    //Will the requested data be anonymized or aggregated after receipt?
    public aaar: boolean = false;
    //Will you provide the data owner with the results from your use of the data？
    public rfyud: boolean = false;
    //will you provide any type of compensation to the data owner for use of the data? If so, describe details？
    public atoc: boolean = false;
    public atocDsec: string = "";

    public descOfInfo: string = "";
    public howDataUse: string = "";
    //share with any other party
    public noShare: boolean = false;
    public yesForAffiliate: boolean = false;
    public sharedAffiliate: string = "";
    public yesForCustom: boolean = false;
    public sharedCustom: string = "";
    //data transmitter
    public transmitByEmail: boolean = false;
    public transmitByPM: boolean = false;
    public pmTransmitter: string = "";
    public transmitBySW: boolean = false;
    public ingested: boolean = false;
    public transmitByOther: boolean = false;
    public otherTransmitter: string = "";
    //security control
    public securityWithEncryption: boolean = false;
    public securityWithSecureTransport: boolean = false;
    public securityWithOther: boolean = false;
    public otherSecurity: string = "";

    public howLongRetained: string = "";
    public additionalInfo: string = "";

    constructor() {

    }
}
