<template>
    <div class="container">
        <br/>
        <b-jumbotron>
            <h4>Current List of Medical Articles</h4>
            <h5>Select an Article to View the Abstract</h5>
        </b-jumbotron>
        <div v-if="articles.length > 0">
            <div>
                <b-card no body class="mb-1">
                    <div v-for="(article, index) in articles" 
                        :key="index" 
                        class="accordion" 
                        role="tablist">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button @click="onAbstract(article); showOverlay();" 
                                    block v-b-toggle="'abstract-accordion-'+index" 
                                    variant="info">
                                <strong>id</strong>: {{article.id}}, 
                                <strong>publisher</strong>: {{article.type}}
                            </b-button>
                        </b-card-header>
                        <b-collapse :id="'abstract-accordion-'+index"
                                    accordion="abstract-accordion" 
                                    role="tabpanel">
                            <b-overlay :show="overlay"
                                    rounded="sm">
                                <b-card>
                                    <b-card-text>{{abstract}}</b-card-text>
                                </b-card>
                            </b-overlay>
                        </b-collapse>
                    </div>
                </b-card>
            </div>
        </div>
        <div v-else>
            <b-alert show variant="warning">There are currently no Articles in the List!</b-alert>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'List',
    data() {
        return {
            articles: [],
            configGet: {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            },
            abstract: '',
            overlay: false
        }
    },
    mounted() {
        this.currentHostname = window.location.hostname
        this.init()
    },
    methods: {
        init() {
            this.getArticleList()
        },
        getArticleList() {
            const path = `http://${this.currentHostname}:2022/articles`
            axios.get(path, this.configGet)
                .then(res => {
                    this.articles = res.data.articles
                })
                .catch(err => {
                    throw err
                })
        },
        onAbstract(selectedArticle) {
            this.abstract = ''
            const path = `http://${this.currentHostname}:2022/articles/${selectedArticle.type}/${selectedArticle.id}`
            axios.get(path, this.configGet)
                .then(res => {
                    this.abstract = res.data.abstract
                    this.overlay = false
                })
                .catch(err => {
                    throw err
                })
        },
        showOverlay() {
            this.overlay = true
        }
    }
}
</script>
