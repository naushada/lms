export interface AppGlobals {
    ServiceType?: Array<string>;
    Events?: Array<string>;
    CountryName?: Array<string>;
    Currency?: Array<string>;
    Role?: Array<string>;
    ExcelHeading?: Array<string>;
    EventLocation?: Array<string>;
}

export const AppGlobalsDefault: AppGlobals = {
    ServiceType: ["Document", 
    "Non Document", 
    "B2B", 
    "eComerce", 
    "Cash(Prepaid)", 
    "CC(Pay in Destination)", 
    "COD", 
    "COR", 
    "Export Documents", 
    "Export Non Documents", 
    "Heavy Shipment"],
    
    Events: ["Document Prepared", 
    "Out For Delivery", 
    "Arrived in HUB", 
    "Not Delivered - Incomplete Address",
    "Not Delivered - Adverse Weather",
    "Not Delivered - Consignee Moved",
    "Not Delivered - Consignee Schedule Delivery",
    "Not Delivered - Courier Out of Time",
    "Not Delivered - Inaccurate/Incomplete Address",
    "Not Delivered - Miscoded",
    "Not Delivered - No One Available/Home",
    "Not Delivered - No Response/ Mobile switch Off",
    "Not Delivered - Refused By Customer",
    "Not Delivered - Unable to Locate Consignee",
    "Not Delivered - Customer out of country",
    "Held In Branch",
    "Customer Refused",
    "Customer Not Available",
    "Attempted-Customer Refused",
    "Attempted - No Answer / Mobile Close",
    "Attempted - Address change",
    "Attempted - Reschedule-Delivery",
    "Attempted - Customer not available",
    "Attempted-Customer Refused - Other (Request to open)",
    "Attempted- Mobile Wrong",
    "Attempted - Pickup from Branch",
    "Attempted - Money not ready",
    "Out for Delivery",
    "Proof of Delivery",
    "Held From Uplift-Pending Customs",
    "Held in Branch- No-Service", 
    "Collection",
    "Documentation prepared",
    "COD Paid to Customer",
    "Damaged",
    "Flight Arrival",
    "Held in Branch",
    "Held in Customs",
    "Holiday",
    "In Transit Delay-Pandemic Restrictions",
    "In Transit to Destination",
    "Info Message Sent to Recipient",
    "In Scan at HUB",
    "Misroute",
    "Attempted-Courier out of Time",
    "Attempted-Inaccurate / Incomplete Address",
    "Attempted-Unable to Locate Consignee",
    "Attempted- Customer out of Country",
    "On-Hold-Prohibited/ Restricted Goods",
    "On-Hold-Required Consignee ID / Tax numder",
    "On-Hold-Required Commercial Invoice",
    "On Hold-Requires Correct Telephone Number",
    "On Hold for KYC",
    "Onforwarded Via Third Party",
    "Pickup Arranged",
    "Pre Sort to Area",
    "Released From Custom",
    "RTO-Enroute",
    "Scheduled for Delivery",
    "Shipment Declared Lost",
    "Shipment Returned to Sender",
    "Shiment Returned to Sending Station",
    "Shipper Contacted",
    "Shipper/Receiver Initiated shipment Details Change",
    "Shortlanded",
    "SMS sent to Receiver with delivery advice",
    "Sorted to Destination",
    "Weight Variation",
    "User Initiated Shipment Cancellation"],

    CountryName: ["UAE",
    "Saudi Arabia",
    "Kuwait",
    "Omani",
    "Baharaini",
    "Qatar"],

    Currency: ["UAE - Dirham",
    "Saudi Arabia- Riyal",
    "Kuwait - Dinar",
    "Omani - Rial",
    "Baharaini - Dinar",
    "Qatar - Riyal"],

    Role: ["Employee",
    "Contract-X",
    "Customer",
    "Agent",
    "Driver",
    "Misc"],

    ExcelHeading: ["AccountCode",
    "ReferenceNo",
    "Weight",
    "ReceiverCity",
    "ReceiverName",
    "ReceiverAddress",
    "ReceiverPhoneNo",
    "ReceiverAlternatePhoneNo",
    "GoodsDescription",
    "CodAmount",
    "AlternateReferenceNo",
    "CustomsValue",
    "CustomsCurrency",
    "SenderName"],

    EventLocation: ["",
    "Riyadh",
    "Dammam",
    "Jeddah",
    "Mecca",
    "Medina",
    "Khobar",
    "Jubail",
    "Tabuk",
    "Buraidah",
    "Onaizah",
    "Rass",
    "Sakakah",
    "AlQurayyat",
    "Arar",
    "Hail",
    "Rafaha",
    "Dawadmi",
    "AlKhafji",
    "HAFAR ALBATIN",
    "Khamis Mushait",
    "Najran",
    "Jizan",
    "Hassa",
    "Yanbu",
    "AlQunfudhah",
    "Taif",
    "AlMajmaah",
    "AlQatif",
    "Dhahran",
    "AlKharj"]

    

}

interface senderInformation {

}

interface shipmentInformation {

}

interface receiverInformation {

}

export interface Shipment {
    senderInfo: senderInformation;
    shipmentInfo: shipmentInformation;
    receiverInfo: receiverInformation;
}

export interface Account {

}

export interface ShipmentStatus{

}

export interface Inventory {

}

export let UriMap = new Map<string, string>([
    ["from_web_shipment",         "/api/v1/shipment/shipping"],
    ["from_web_single_shipment",  "/api/v1/shipment/single/shipping"],
    ["from_web_bulk_shipment",    "/api/v1/shipment/bulk/shipping"],
    ["from_web_config",           "/api/v1/config"],
    ["from_web_account",          "/api/v1/account/account"],
    ["from_web_manifest",         "/api/v1/inventory/manifest"],
    ["from_web_document",         "/api/v1/document"],
    ["from_web_send",             "/api/v1/email/send"],
]);