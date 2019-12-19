    import { mount } from "@vue/test-utils";
    import App from "@/App";
    
    describe("App", () => {
      test("check if there are 10 characters displayed", () => {
        const wrapper = mount(App);
        expect( wrapper.findAll("character").length == 10).toBe(true);
      });
    });