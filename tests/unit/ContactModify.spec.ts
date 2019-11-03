import ContactModify from '@/components/ContactModify.vue';
import { shallowMount, createWrapper } from '@vue/test-utils';

const wrapper = shallowMount(ContactModify, {
    propsData : {contact: {
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
    },
});

describe('ContactModify.vue', () => {
    it('check modify modal is open after click on modify button', () => {
        wrapper.find('button.btn-contact-edit.float-right.text-white').trigger('click');
        expect(wrapper.vm.$data.display).toBe('block');
    });

    it('check modify modal is closed after clicking on "x"', () => {
        wrapper.find('button.btn-contact-edit.float-right.text-white').trigger('click');
        wrapper.find('.close').trigger('click');
        expect(wrapper.vm.$data.display).toBe('none');
    });
});
