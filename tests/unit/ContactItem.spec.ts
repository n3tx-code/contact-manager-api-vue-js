import ContactItem from '@/components/ContactItem.vue';
import { shallowMount, createWrapper } from '@vue/test-utils';

// wrapper in the "it" because the props value can't be update if you have a general wrapper
describe('ContactItem.vue', () => {
    it('Verify that the contact is correctly show if we search a white space', () => {
        const wrapper = shallowMount(ContactItem, {
            propsData : {
                contact: {
                    ID : 6,
                    ID_owner : 2,
                    forname : 'Nils',
                    name : 'VAEDE',
                    phonePro :  undefined,
                    phonePerso : undefined,
                    emailPro : undefined,
                    emailPerso : undefined,
                    linkendin : undefined,
                    facebook : undefined,
                    twitter : undefined,
                    website : undefined,
                    imgContact : undefined,
                    lastModification : '2019-11-03 15:29:22',
                },
                rechercheString : ' ',
            },
        });
        expect(wrapper.vm.$data.show).toBeTruthy();
    });

    it('Verify that the contact is correctly show if the search text is contained in the contact name', () => {
        const wrapper = shallowMount(ContactItem, {
            propsData : {
                contact: {
                    ID : 6,
                    ID_owner : 2,
                    forname : 'Nils',
                    name : 'VAEDE',
                    phonePro :  undefined,
                    phonePerso : undefined,
                    emailPro : undefined,
                    emailPerso : undefined,
                    linkendin : undefined,
                    facebook : undefined,
                    twitter : undefined,
                    website : undefined,
                    imgContact : undefined,
                    lastModification : '2019-11-03 15:29:22',
                },
                rechercheString : 'il',
            },
        });
        expect(wrapper.vm.$data.show).toBeTruthy();
    });

    it('Verify that the contact is not show if the search text is not contained in the contact name', () => {
        const wrapper = shallowMount(ContactItem, {
            propsData : {
                contact: {
                    ID : 6,
                    ID_owner : 2,
                    forname : 'Nils',
                    name : 'VAEDE',
                    phonePro :  undefined,
                    phonePerso : undefined,
                    emailPro : undefined,
                    emailPerso : undefined,
                    linkendin : undefined,
                    facebook : undefined,
                    twitter : undefined,
                    website : undefined,
                    imgContact : undefined,
                    lastModification : '2019-11-03 15:29:22',
                },
                rechercheString : 'o',
            },
        });
        expect(wrapper.vm.$data.show).toBeFalsy();
    });

});
