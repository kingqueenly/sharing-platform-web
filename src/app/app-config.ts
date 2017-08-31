/**
 * Created by paulliu on 2017/1/17.
 */

export class AppConfig {
    //local
    apiEndpoint = "http://localhost:8080";
    filePath='';
    baseUrl="http://localhost:4200";

    //UAT environment
    // apiEndpoint = "https://bi-portal-cn-int.daimler.com/backend";
    // filePath='/filePath';
    // baseUrl="https://bi-portal-cn.i.daimler.com/sharingplatform";

    //Production environment
    // apiEndpoint = "https://bi-portal-cn.i.daimler.com/backend";
    // filePath = '/filePath';
    // baseUrl = "https://bi-portal-cn.i.daimler.com/sharingplatform";

    stages = ["Concept", "Analysis", "Validation", "Implementation"];
    stagesForQuery = ["All", "Concept", "Analysis", "Validation", "Implementation"];
    phases = ['Awareness', 'Consideration', 'Purchase', 'Customer Care/Usage', 'Loyalty/Repurchase', 'Others'];
    phasesForQuery = ['All', 'Awareness', 'Consideration', 'Purchase', 'Customer Care/Usage', 'Loyalty/Repurchase', 'Others'];
    customerPhases = ['Awareness', 'Consideration', 'Purchase', 'Customer Care/Usage', 'Loyalty/Repurchase'];
    othersPhases = ['Others'];
    // functionalPhases=['Financial','Controlling','HR','RD','Legal','IT'];
    category = ["Customer Journey", "Other Use Case"]


    searchUserItems = ['Name', 'Skill', 'Department'];
    appellations = ['Mr.', 'Ms.', 'Mrs.', 'Dr.'];
    organizations = ['BMBS', 'DGRC', 'MBAFC', 'HQ'];
    BMBS = ['BMBS/AS', 'BMBS/AW', 'BMBS/AC', 'BMBS/NP', 'BMBS/SL', 'BMBS/SM'];
    DGRC = ['DFS/CA', 'FF/I', 'FGC', 'GC/C', 'GRC/PM', 'GRC/S', 'GRC/SJV', 'HRC',
        'HRC/JV', 'HRC/MA', 'ITS/C', 'ITS/CD', 'ITS/CT', 'ITS/CW', 'L/GC',
        'PM C/IC', 'RD'];
    MBAFC = ['DFS/CN', 'DFS/CNS', 'FS/CN', 'ITF/CD'];
    HQ = ['GSP'];
    companiesForQuery = ['DGRC', 'BMBS', 'MBAFC', 'DPTS', 'Others'];

}
