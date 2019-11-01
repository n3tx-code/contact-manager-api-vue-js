export default interface Contact {
    ID: number;
    ID_owner: number;
    name?: string;
    forname?: string;
    phonePro?: string;
    phonePerso?: string;
    emailPro?: string;
    emailPerso?: string;
    linkendin?: string;
    facebook?: string;
    twitter?: string;
    website?: string;
    imgContact?: string;
    lastModificationDate: Date;
}
