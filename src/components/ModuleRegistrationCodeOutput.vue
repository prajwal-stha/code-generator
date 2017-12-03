<template>
    <div class="wpd-code-output">
        <h5>Code Output</h5>
        <pre class="language-php">
            <code>
<?php
/**
* @class {{ wpdModuleName | concat }}
*/
class {{ wpdModuleName | concat }} extends FLBuilderModule {

    /**
    *
    * @method __construct
    *
    */
    public function __construct() {
        parent::__construct([
            'name'        => __('{{ wpdModuleName | concat }}', '{{ wpdModuleLang }}'),
            'description' => __('{{ wpdModuleDesc }}', '{{ wpdModuleLang }}'),
            'category'    => __('{{ wpdModuleCat }}', '{{ wpdModuleLang }}'),
            'slug'        => '{{ wpdModuleSlug }}'
        ]);
    }

    /**
    * Register the module and its form settings.
    */
    FLBuilder::register_module('{{ wpdModuleName }}', {{  `[
        ${getTabs()}` }}
    ]);
}
            </code>
        </pre>
    </div>
</template>

<script>
    export default {
        props: [
            'wpdModuleName', 'wpdModuleDesc', 'wpdModuleCat', 'wpdModuleSlug', 'wpdModuleLang', 'tabs'
        ],
        methods: {
            getTabs () {
                return `${this.tabs.map(tab => `
            '${this.generateLabelSlug(tab.title)}' => [
                'title' => __('${tab.title}', '${this.wpdModuleLang}'),
                'sections' => [
                    ${this.getSections(tab)}
                ]
            ],`).join('')}`.trim()
            },
            getSections (tab) {
                return `${tab.sections.map(section => `
                    '${this.generateLabelSlug(section.title)}' => [
                        'title' => __('${section.title}', '${this.wpdModuleLang}'),
                        'fields' => [
                            ${this.getFields(section)}
                        ]
                    ],`).join(' ')}`.trim()
            },
            getFields (section) {
                return `${section.fields.map(field => `
                            '${this.generateLabelSlug(field.label)}' => [
                                'label' => __('${field.label}', '${this.wpdModuleLang}'),
                                'type' => ${field.type}
                            ],`).join('')}`.trim()
            }
        },
        filters: {
            concat (value) {
                return value.replace(/\s/g, '')
            }

        }
    }
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
