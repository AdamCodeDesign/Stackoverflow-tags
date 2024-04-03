import TotalTags from "../components/TotalTags";

export default {
    title: "TotalTags",
    component: TotalTags
}

export const Template = (args)=> <TotalTags {...args}/>

export const Green = Template.bind({})
Green.args = {
    backgroundColor: 'green',
    fontSize:'1em'
}