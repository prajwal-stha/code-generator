<template>
    <div id="wpd-app">
        <div class="container-fluid" v-cloak>
            <b-card no-body>
                <b-tabs small card ref="tabs" v-model="tabIndex">
                    <b-tab title="Module Info">
                        <h2 class="mtb-40">Beaver Builder Module Generator</h2>
                        <div class="row">
                            <div class="col-md-9">
                                <form id="wpd-main">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="wpd-company-name">COMPANY NAME</label>
                                                <input type="text" id="wpd-company-name" class="form-control mb-40" v-model.trim="wpdCompanyName">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="wpd-instruction-container mt-30">
                                                <div class="wpd-instruction">
                                                    <p>This is where we'll show instructions for the field to the user.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="wpd-module-name">MODULE NAME</label>
                                                <input type="text" id="wpd-module-name" class="form-control mb-40" v-model.trim="wpdModuleName">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="wpd-instruction-container mt-30">
                                                <div class="wpd-instruction">
                                                    <p>This is where we'll show instructions for the field to the user.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="wpd-module-description">MODULE DESCRIPTION</label>
                                                <input type="text" id="wpd-module-description" class="form-control mb-40" v-model.trim="wpdModuleDesc">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="wpd-instruction-container mt-30">
                                                <div class="wpd-instruction">
                                                    <p>This is where we'll show instructions for the field to the user.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="wpd-module-category">MODULE CATEGORY</label>
                                                <input type="text" id="wpd-module-category" class="form-control mb-40" v-model.trim="wpdModuleCat">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <!-- Add Instructions for the user here -->
                                            <div class="wpd-instruction-container mt-30">
                                                <div class="wpd-instruction">
                                                    <p>This is where we'll show instructions for the field to the user.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div><!-- end of col-md-9 -->
                        </div><!-- end of row -->
                    </b-tab>
                    <b-tab title="Module Fields">
                        <div class="tab-pane" id="wpd-module-fields" role="tabpanel">
                            <h2 class="mtb-40">{{ wpdModuleName }}</h2>
                            <div class="row">
                                <div class="col-md-12 wpd-add-tabs">
                                    <ul class="nav nav-tabs">
                                        <li v-for="tab in tabs" class="nav-item">
                                            <a v-bind:class="{'nav-link d-flex align-items-center tab': true, 'active': (tab.id == activeTab.id) }" v-on:click="activateTab(tab)">
                                                <span class="mr-5" v-show="!tab.editMode">{{ tab.title }}</span>
                                                <input v-bind:id="tab.id" class="form-control" type="text" v-show="tab.editMode" placeholder="Tab Name" v-model="tab.title">
                                                <button class="icon-btn" v-show="!tab.editMode" v-on:click="editTabName(tab)">
                                                   <icon name="pencil"></icon>
                                                </button>
                                                <button class="icon-btn wpd-check" v-show="tab.editMode" v-on:click="acceptEditTab(tab)">
                                                    <icon name="check"></icon>
                                                </button>
                                                <button class="icon-btn" v-show="tabs.length > 1" v-on:click="deleteTab(tab)">
                                                    <icon name="times"></icon>
                                                </button>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link d-flex align-items-center tab add-btn" href="javascript:void(0);">
                                                <button class="icon-btn" v-on:click="addNewTab()">
                                                    <icon name="plus-circle"></icon> Add Tab
                                                </button>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="card tab-contents p-30">
                                        <div class="card-block">
                                            <div class="card-text">
                                                <div class="mb-40" v-for="section in this.activeTab.sections">
                                                    <a v-bind:class="{'nav-link d-flex align-items-center tab': true, 'active': (section.id == activeSection.id) }" v-on:click="activateSection(section)">
                                                        <span class="mr-5" v-show="!section.editMode">{{ section.title }}</span>
                                                        <input v-bind:id="section.id" class="form-control" type="text" v-show="section.editMode" placeholder="Add Tab to this section" v-model="section.title">
                                                        <button class="icon-btn" v-show="!section.editMode" v-on:click="editSectionName(section)">
                                                            <icon name="pencil"></icon>
                                                        </button>
                                                        <button class="icon-btn wpd-check" v-show="section.editMode" v-on:click="acceptEditSection(section)">
                                                            <icon name="check"></icon>
                                                        </button>
                                                        <button class="icon-btn" v-on:click="deleteSection(section)" v-if="getNumberOfSections > 1">
                                                             <icon name="times"></icon>
                                                        </button>
                                                    </a>
                                                    <ul class="wpd-non-bullet" v-if="section.fields.length">
                                                        <draggable :list="section.fields" :options="{group:'field', handle:'.wpd--drag'}" @start="drag=true" @end="drag=false">
                                                            <transition-group>
                                                                <li v-for="field in section.fields" :key="field.id">
                                                                    <div class="row mt-20">
                                                                        <div class="col-md-10">
                                                                            <div class="form-group">
                                                                                <label>{{ field.label }}</label>
                                                                                <input v-model="field.label"
                                                                                       :name="generateSlug(field.label)"
                                                                                       @keyup="acceptEditField(field)"
                                                                                       class="form-control"
                                                                                       type="text" />
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-2 mt-40 wpd-customize-field">
                                                                            <a class="wpd-customize-link" title="Costumize"><icon name="wrench"></icon></a>
                                                                            <a class="wpd-customize-link" @click="deleteField(field)" title="Delete"><icon name="trash"></icon></a>
                                                                            <a class="wpd--drag" title="Drag to Move"><icon name="hand-o-up"></icon></a>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </transition-group>
                                                        </draggable>
                                                    </ul>
                                                    <div class="row">
                                                        <div class="col-md-3 offset-9">
                                                            <button class="icon-btn btn" @click="addNewField(section)"><icon name="plus-circle"></icon> Add Field to this section</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-12 mt-40 mb-20 text-center">
                                                    <button class="icon-btn btn-info btn wpd-new-section" @click="addNewSection()"><icon name="plus-circle"></icon> Add section to this tab</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-tab>
                </b-tabs>
                <div class="col-md-9">
                    <module-registration-code-output
                        :tabs="tabs"
                        :wpdModuleName="wpdModuleName"
                        :wpdModuleDesc="wpdModuleDesc"
                        :wpdModuleCat="wpdModuleCat"
                        :wpdModuleSlug="wpdModuleSlug"
                        :wpdModuleLang="wpdModuleLang"
                    ></module-registration-code-output>
                </div>
            </b-card>
        </div><!-- end of container -->
    </div><!-- end of app -->
</template>

<script>
    import ModuleRegistrationCodeOutput from './components/ModuleRegistrationCodeOutput.vue'
    import draggable from 'vuedraggable'

    export default {
        components: {
            draggable,
            'module-registration-code-output': ModuleRegistrationCodeOutput
        },
        data () {
            return {
                wpdCompanyName: '',
                wpdModuleName: '',
                wpdModuleDesc: '',
                wpdModuleCat: '',
                wpdModuleSlug: '',
                wpdModuleLang: '',
                tabIndex: 0,
                sectionIndex: 0,
                activeTab: null,
                activeSection: null,
                fieldIndex: 0,
                tabs: [
                    {
                        id: 1,
                        title: 'Tab 1',
                        sections: [
                            {
                                id: 1,
                                title: 'Section 1',
                                slug: 'section-1',
                                fields: [
                                    {
                                        id: 1,
                                        label: 'Field 1',
                                        slug: 'field-1',
                                        type: 'text'
                                    }
                                ],
                                editMode: false
                            }
                        ],
                        editMode: false
                    }
                ],
                newField: ''
            }
        },
        watch: {
            wpdModuleName: function (val) {
                if (val) {
                    this.wpdModuleSlug = this.generateSlug(val)
                }
            },
            wpdCompanyName: function (val) {
                if (val) {
                    this.wpdModuleLang = this.generateSlug(val)
                }
            }
        },
        methods: {
            activateTab: function (tab) {
                this.activeTab = tab
                this.activateSection(tab.sections[0])
            },
            activateSection: function (section) {
                this.activeSection = section
            },
            addNewTab: function () {
                let newId = this.tabs[this.tabs.length - 1].id + 1
                this.tabs.push({
                    id: newId,
                    title: `Tab ${newId}`,
                    sections: [
                        {
                            id: 1,
                            title: 'Section 1',
                            slug: 'section-1',
                            fields: [
                                {
                                    id: 1,
                                    label: 'Field 1',
                                    slug: 'field-1',
                                    type: 'text'
                                }
                            ],
                            editMode: false
                        }
                    ],
                    editMode: false
                })
                this.activateTab(this.tabs[this.tabs.length - 1])
            },
            addNewSection: function () {
                let newSectionId = this.activeTab.sections[this.activeTab.sections.length - 1].id + 1
                this.activeTab.sections.push({
                    id: newSectionId,
                    title: `Section ${newSectionId}`,
                    slug: `section-${newSectionId}`,
                    fields: [
                        {
                            id: 1,
                            label: 'Field 1',
                            slug: 'Field 1',
                            type: 'text'
                        }
                    ],
                    editMode: false
                })
                this.activateSection(this.activeTab.sections[this.activeTab.sections.length - 1])
            },
            editTabName: function (tab) {
                tab.editMode = true
                this.activateTab(tab)
                this.activateSection(tab.sections[0])
            },
            editSectionName: function (section) {
                section.editMode = true
                this.activateSection(section)
            },
            acceptEditSection: function (section) {
                if (section.title) {
                    section.slug = this.generateSlug(section.title)
                }
                section.editMode = false
            },
            acceptEditField: function (field) {
                field.slug = this.generateSlug(field.label)
            },
            acceptEditTab: function (tab) {
                tab.editMode = false
            },
            deleteTab: function (tab) {
                this.tabs = this.tabs.filter(t => t.id !== tab.id)
                if (this.tabs.length === 0) {
                    $('.card-block .card-title').innerHTML = ''
                    $('.card-block .card-text').innerHTML = ''
                }
            },
            deleteSection: function (section) {
                this.activeTab.sections = this.activeTab.sections.filter(s => s.id !== section.id)
                if (this.sections.length === 0) {
                    $('.card-block .card-title').innerHTML = ''
                    $('.card-block .card-text').innerHTML = ''
                }
            },
            addNewField: function (section) {
                let newFieldId = section.fields[section.fields.length - 1].id + 1
                section.fields.push({
                    id: newFieldId,
                    label: `Field ${newFieldId}`,
                    slug: `field-${newFieldId}`,
                    type: 'text'
                })
            },
            deleteField: function (field) {
                this.activeSection.fields.splice(field, 1)
            },
            /*
            * https://codepen.io/tatthien/pen/xVBxZQ
             */
            generateSlug: function (title) {
                let slug = ''
                const titleLower = title.toLowerCase()
                slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e')
                slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a')
                slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o')
                slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u')
                slug = slug.replace(/đ/gi, 'd')
                slug = slug.replace(/\s*$/g, '')
                slug = slug.replace(/\s+/g, '-')
                return slug
            }
        },
        created: function () {
            this.activeTab = this.tabs[0]
            this.activeSection = this.activeTab.sections[0]
        },
        computed: {
            getNumberOfSections: function () {
                return this.activeTab.sections.length
            },
            getNumberofFields: function () {
                return this.activeSection.fields.length
            }
        }
    }
</script>

<style scoped>
    #wpd-app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }
    .mt-30 {
        margin-top: 30px;
    }
    .mt-40, .mtb-40 {
        margin-top: 40px;
    }
    .mb-40, .mtb-40 {
        margin-bottom: 40px;
    }
    form#wpd-main, .mb-80 {
        margin-bottom: 80px;
    }
    :not(pre) > code[class*="language-"], pre[class*="language-"], .wpd-instruction {
        background: #C0C0C0;
        border: 1px solid #000;
    }
    .wpd-instruction {
        padding: 10px;
        color: #000;
    }
    code[class*="language-"], pre[class*="language-"] {
        text-shadow: none;
    }
    ul.nav-tabs {
        margin-top: 12px;
    }

    .card.tab-contents {
        border-top: none;
        border-radius: 0;
    }

    .nav-link.tab {
        border-radius: 0;
        padding-right: 8px;
    }
    .nav-link.tab span {
        transition: color 0.8s;
        color: black;
        opacity: 0.54;
    }
    .nav-link.tab span:hover {
        color: #2980b9;
    }
    .nav-link.tab.active span {
        opacity: 1;
    }
    .nav-link.tab .icon-btn {
        margin-left: 6px;
        text-decoration: none;
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        font-size: 0.875rem;
    }
    .nav-link.tab .icon-btn.wpd-check {
        opacity: 0.54;
        transition: color 0.8s;
    }
    .nav-link.tab .icon-btn.wpd-check:hover {
        color: #c0392b;
    }
    .nav-link.tab.add-btn {
        padding-left: 8px;
    }
    .nav-link.tab.add-btn .icon-btn{
        color: #2980b9;
        margin: 0;
    }
    ul.wpd-non-bullet {
        list-style: none;
        max-width: 90%;
    }
    .mt-20 {
        margin-top: 30px;
    }
    .mt-40 {
        margin-top: 40px;
    }
    .mb-20 {
        margin-bottom: 20px;
    }
    .p-30 {
        padding: 30px;
    }
    button:hover {
        cursor: pointer;
    }
    a, button {
        outline: none;
    }
    .wpd-new-section {
        font-size: 25px;
        padding: 10px 50px;
    }
    .wpd-customize-field > a {
        margin: 0 10px;
    }
    .wpd-customize-field > a.wpd-customize-link:hover {
        cursor: pointer;
    }
    .wpd--drag {
        cursor: move;
        cursor: -webkit-grabbing;
    }
</style>
