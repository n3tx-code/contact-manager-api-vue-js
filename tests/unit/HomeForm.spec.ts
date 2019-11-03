import HomeForm from '@/components/HomeForm.vue';
import { shallowMount, createWrapper } from '@vue/test-utils';

describe('HomeForm.vue', () => {
    it('Check if signin form is show when you click on signin button', () => {
        const wrapper = shallowMount(HomeForm);
        wrapper.find('#home-choise-signIn').trigger('click');
        expect(wrapper.vm.$data.sigIn_selected).toBeTruthy();
    });

    it('Check if login form is show when you click on login button', () => {
        const wrapper = shallowMount(HomeForm);
        wrapper.find('#home-choise-logIn').trigger('click');
        expect(wrapper.vm.$data.login_selected).toBeTruthy();
    });
});
