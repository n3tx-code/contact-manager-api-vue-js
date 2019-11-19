import ContactAdd from '@/components/ContactAdd.vue';
import { shallowMount, createWrapper } from '@vue/test-utils';

const wrapper = shallowMount(ContactAdd);

describe('ContactAdd.vue', () => {
    it('check if correctly show or not the additional options depending of number of click ', () => {
        const button = wrapper.find('button.btn.btn-link.text-center.col-12');
        const randomNumberOfClick = Math.floor((Math.random() * 10) + 1);
        for (let i = 0; i < randomNumberOfClick; i++) {
            button.trigger('click');
        }

        if (randomNumberOfClick % 2 === 0) {
            expect(wrapper.vm.$data.moreDetails).toBeFalsy();
        } else {
            expect(wrapper.vm.$data.moreDetails).toBeTruthy();
        }
    });
});
