<template>
  <div class="max-w-full">
    <draggable 
      id="board" 
      v-model="columns" 
      group="columns" 
      ghost-class="ghost" 
      draggable=".isDraggable" 
      :delay="200" 
      :delay-on-touch-only="true" 
      class="flex flex-wrap m-0 pt-10"
    >
      <div 
        v-for="(column, indexColumn) in columns" 
        :key="indexColumn" 
        class="cardColumm mr-3 isDraggable widthColumn bg-gray-900 text-gray-300 rounded-lg p-2"
      >
        <div class="flex mb-0 hoverGrab ">
          <h3 class="hover:bg-gray-800 min-w-full flex items-center pl-2 rounded-lg">
            {{ column.name }}
          </h3>
        </div>


        <draggable 
          :id="'idColumn' + column.id" 
          v-model="column.cards" 
          group="cards" 
          :list="column.cards" 
          ghost-class="ghost"
          :delay="200" 
          :delay-on-touch-only="true"
          class="min-h-0 scrollBar flex-auto mb-0 overflow-y-auto overflow-x-hidden z-10 pt-4"
          @start="drag = true" 
          @end="drag = false" 
        >
          <div 
            v-for="(card) in column.cards" 
            :key="card.id" 
            class="flex"
          >
            <div 
              v-if="!card.editable"
              class="mb-2 hoverGrab  min-w-full" 
              elevation="1" 
              @mouseover="card.hover = true"
              @mouseleave="card.hover = false" 
            >
              <div class="flex mb-0 hoverGrab ">
                <h3 
                  class="text-gray-400 bg-gray-800 hover:bg-gray-700 min-w-full rounded-lg p-2"
                  @click="onShowTask(card)"
                >
                  {{ card.name }}
                </h3>
              </div>
            </div>
            <div 
              v-else 
              class="mb-2 justify-between p-2 min-w-full"
            >
              <textarea 
                :ref="'inputAddCard' + column.id"
                v-model="card.name"
                placeholder="Introduzca el título" 
                class=" bg-gray-800 resize-none min-w-full rounded-lg w-full active:border-none p-2"
                @keyup.enter="onAddConfirmCard(column)" 
                @blur="onAddConfirmCard(column)"
              >Default
              </textarea>
            </div>
          </div>
        </draggable>

        <div 
          v-if="!column.isAddingCard"
          class="pa-3"
        >
          <button 
            class="button-add-card rounded-lg  hover:bg-gray-800 min-w-full flex text-gray-400 text-[14px] h-10 items-center"
            block 
            @click="addCard(column)"
          >
            <svg 
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M12 4.5v15m7.5-7.5h-15" 
              />
            </svg> Add new card
          </button>
        </div>
        <div  
          v-else 
          class="flex items-center"
        >
          <button 
            class="p-1 m-2 rounded-md text-[14px] bg-blue-400 text-gray-800 flex"
            @click="onAddConfirmCard(column)"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5"
              stroke="currentColor" 
              class="w-6 h-6"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M12 4.5v15m7.5-7.5h-15" 
              />
            </svg> Add card
          </button>
          <button
            class="p-2 m-2 text-gray-600 hover:text-gray-400"
            @click="onAddConfirmCard(column)"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5"
              stroke="currentColor" 
              class="w-6 h-6"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
      </div>


      <div class="bg-gray-900 rounded-lg text-gray-300">
        <button 
          v-show="!isAddingColumn"
          class="max-h-full flex-auto p-2 items-stretch widthColumn  hover:bg-gray-800 flex text-gray-400 text-[14px]"
          @click="addColumn()"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5"
            stroke="currentColor" 
            class="w-6 h-6"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              d="M12 4.5v15m7.5-7.5h-15" 
            />
          </svg> Add Columna
        </button>
        <span 
          v-show="isAddingColumn"
          class="pa-0 widthColumn"
        >
          <textarea  
            :ref="'inputAddColumn'"
            v-model="nameColumn" 
            class="pa-0 ma-0 bg-gray-800 resize-none min-w-full rounded-lg w-full  p-2 active:border-none"
            placeholder="Introduzca el título" 
            @blur="confirmAddColumn" 
            @keyup.enter="confirmAddColumn" 
            @click:append="confirmAddColumn"
          >
            Default
          </textarea>

        </span>
      </div>
    </draggable>
    <div>
      <div 
        :class="'relative z-10 ' + visibleClass" 
        aria-labelledby="modal-title" 
        role="dialog" 
        aria-modal="true"
      >
        <!--<div 
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        >
        </div>
        -->
        <div 
          class="fixed inset-0 z-10 overflow-y-auto"
        >
          <div 
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <div
              class="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all sm:my-8 w-[700px]  text-gray-400"
            >
              <div 
                class="bg-gray-800 px-4 pb-4 sm:pb-4 pt-4"
              >
                <div>
                  <div 
                    class="mt-4 text-center sm:ml-4 sm:mt-0 sm:text-left"
                  >
                    <h3 
                      id="modal-title"
                      class="text-base font-semibold leading-6 flex" 
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        stroke-width="1.5" 
                        stroke="currentColor" 
                        class="w-5 h-5"
                      >
                        <path 
                          stroke-linecap="round" 
                          stroke-linejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" 
                        />
                      </svg>
                      <span>&nbsp;{{ selectedTaskShow.name }}</span>
                    </h3>
                    <div class="mt-8 flex">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        stroke-width="1.5" 
                        stroke="currentColor" 
                        class="w-6 h-6"
                      >
                        <path 
                          stroke-linecap="round" 
                          stroke-linejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" 
                        />
                      </svg>
                      <p class="text-sm font-semibold">
                        &nbsp;Description
                      </p>
                    </div>
                    <div class="mt-2">
                      <p 
                        v-if="!editDescription"
                        class="text-sm text-[12px]" 
                        @click="editDescription = !editDescription; newDescription = selectedTaskShow.description"
                        v-html="selectedTaskShow.description"
                      >
                      </p>


                      <div v-if="editDescription">
                        <ckeditor 
                          v-model="newDescription"
                          :editor="editor" 
                          :config="editorConfig"
                        >
                        </ckeditor>
                      </div>

                      <div 
                        v-if="editDescription" 
                        class="py-3 sm:flex"
                      >
                        <button 
                          class="inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm sm:ml-3 sm:w-auto"
                          type="button" 
                          @click="saveDescription()"
                        >
                          Save
                        </button>
                        <button 
                          type="button"
                          class="mt-3 inline-flex w-full justify-center rounded-m px-3 py-2 text-sm font-semibold shadow-sm ring-inset sm:mt-0 sm:w-auto"
                          @click="editDescription = false;"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <div class="mt-8 flex">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        stroke-width="1.5" 
                        stroke="currentColor" 
                        class="w-6 h-6"
                      >
                        <path 
                          stroke-linecap="round" 
                          stroke-linejoin="round"
                          d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" 
                        />
                      </svg>

                      <p class="text-sm font-semibold">
                        &nbsp;Activity
                      </p>
                    </div>
                    <div class="mt-2 flex">
                      <img 
                        v-if="!createActivity" 
                        class="h-6 w-6 rounded-full mr-2"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="avatar"
                      >
                      <p 
                        v-if="!createActivity" 
                        class="bg-gray-900/80 hover:bg-gray-700 w-full rounded-lg text-[12px] py-1.5 px-2 cursor-pointer"
                        @click="createActivity = !createActivity"
                      >
                        Write a comment...
                      </p>
                      <div v-if="createActivity">
                        <ckeditor 
                          v-model="newActivity" 
                          :editor="editor" 
                          :config="editorConfig"
                        >
                        </ckeditor>
                        <div class="py-3 sm:flex">
                          <button 
                            class="inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm sm:ml-3 sm:w-auto"
                            type="button" 
                            @click="saveActivity()"
                          >
                            Save
                          </button>
                          <button 
                            type="button" 
                            class="mt-3 inline-flex w-full justify-center rounded-m px-3 py-2 text-sm font-semibold shadow-sm ring-inset sm:mt-0 sm:w-auto"
                            @click="createActivity = false;"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                    <div 
                      v-for="(activity, index) in selectedTaskShow.listaActividad"
                      :key="index"
                    >
                      <p class="text-[10px] font-semibold ml-9 mt-2">
                        {{ activity.usr_create }}
                        <span>{{ formDatatime(activity.time_create) }}</span>
                      </p>
                      <div class="text-[12px] sm:text-left flex">
                        <img 
                          class="h-6 w-6 rounded-full mr-2"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="avatar"
                        >
                        <p 
                          class="bg-gray-900/80 w-full rounded-lg text-[12px] py-1.5 px-2"
                          v-html="activity.text"
                        >
                        </p>
                      </div>
                      <div class="ml-9 text-[10px]">
                        <a 
                          href="#" 
                          clase="underline"
                        >
                          Edit
                        </a>&nbsp;
                        <a 
                          clase="underline" 
                          href="#"
                          @click="deleteActivity(activity.id)"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button 
                  type="button" 
                  class="mt-3 inline-flex w-full justify-center rounded-m px-3 py-2 text-sm font-semibold shadow-sm  ring-inset sm:mt-0 sm:w-auto"
                  @click="onCloseShowTask"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

import moment from 'moment'
import CKEditor from '@ckeditor/ckeditor5-vue2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import editorConfig from './../conf/editorConfig'

export default {
    name: 'BoardContent',
    components: {
        draggable,
        ckeditor: CKEditor.component
    },
    data() {
        return {
            editor: ClassicEditor,
            editDescription: false,
            createActivity: false,
            newActivity: '',
            newDescription: '',
            updatedCard: this.card,
            visibleDeleteActivity: true,
            editorConfig: editorConfig,
            visibleModalCardData: false,
            columns: [],
            dialogShowTask: false,
            selectedTaskShow: {},
            isAddingCard: false,
            cardCreating: {},
            isAddingColumn: false,
            nameColumn: '',
            fav: false,

            //Testes
            testCheckList: false

        }
    },
    computed: {
        visibleClass() {
            return this.dialogShowTask ? '' : 'hidden'
        },
        visibleDeleteActivityClass() {
            return this.visibleDeleteActivity ? '' : 'hidden'
        }
    },
    watch: {
        $route(to) {
            // react to route changes...
            if (!('task' in to.query)) {
                this.onCloseShowTask()
            }
        }
    },
    mounted() {


        //hago un fetch de la data que esta enm public
        fetch('columns.json')
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.columns = response.columns
            })

        if ('task' in this.$route.query) {
            let task = this.$route.query.task
            for (let iColumn = 0; iColumn < this.columns.length; iColumn++) {
                for (let iCard = 0; iCard < this.columns[iColumn].cards.length; iCard++) {
                    if (this.columns[iColumn].cards[iCard].id == task) {
                        this.onShowTask(this.columns[iColumn].cards[iCard])
                        return
                    }
                }
            }
        }
    },
    methods: {
        saveActivity() {
            setTimeout(() => {
                this.selectedTaskShow.listaActividad.push({
                    id: Math.floor((Math.random() * 1000000) + 1),
                    text: this.newActivity,
                    time_create: '2022-08-07T22:06:20+00:00'
                })
                this.createActivity = false
            }, 100)
        },
        saveDescription() {
            setTimeout(() => {
                this.selectedTaskShow.description = this.newDescription
                this.editDescription = false
            }, 100)
        },
        removeClass(clase, elemento) {
            let element = document.getElementById(elemento);
            element.classList.remove(clase);
        },
        addActivity() {
            let id = Math.floor((Math.random() * 1000000) + 1)
            this.selectedTaskShow.listaActividad.push({
                id: id,
                text: this.selectedTaskShow.actividad,
                time_create: '2022-08-07T22:06:20+00:00'
            });
            this.selectedTaskShow.actividad = ''
        },
        onShowTask(element) {
            this.$router.push({ path: '/', query: { task: element.id } })
            this.dialogShowTask = true
            setTimeout(() => {
                this.selectedTaskShow = element
            }, 500)
        },
        onCloseShowTask() {
            this.$router.push({ path: '/', query: {} })
            this.dialogShowTask = false
            this.selectedTaskShow = {}
        },
        addCard(column) {
            this.isAddingCard = true
            column.isAddingCard = true
            column.cards.push({
                id: Math.random(),
                name: '',
                description: '',
                actividad: '',
                listaActividad: [],
                hover: false,
                editable: true
            })

            setTimeout(() => {
                this.$refs['inputAddCard' + column.id][0].focus()
            }, 100)
            this.scrollTo('#idColumn' + column.id, 'top')
        },
        scrollTo(element, direction = 'top') {
            setTimeout(() => {
                let container = this.$el.querySelector(element)
                if (direction == 'top') {
                    container.scrollTop = container.scrollHeight
                } else if (direction == 'right') {
                    container.scrollLeft = container.scrollWidth
                }
            }, 1)
        },
        addColumn() {
            this.isAddingColumn = true
            setTimeout(() => {
                this.$refs.inputAddColumn.focus()
                this.scrollTo('#board', 'right')
            }, 100)
        },
        confirmAddColumn() {
            //si es vcacio cierra y no agrega la columna 
            if (!this.nameColumn || !0 === this.nameColumn.length) {
                this.isAddingColumn = false
                this.nameColumn = ''
                return
            }
            let column = {
                id: Math.floor((Math.random() * 1000000) + 1),
                name: this.nameColumn,
                cards: []
            }
            this.columns.push(column)
            this.isAddingColumn = false
            this.nameColumn = ''
            this.scrollTo('#board', 'right')
        },
        onAddConfirmCard(column) {
            this.isAddingCard = false
            column.isAddingCard = false
            column.cards = column.cards.filter((card) => {
                if (card.editable) {
                    if (card.name || !0 === card.name.length) {
                        card.editable = false
                        return card
                    }
                } else {
                    return card
                }
            })

            this.scrollTo('#idColumn' + column.id, 'top')
        },
        onDeleteActivity(id) {
            //busco en las columnas la tarjeta y la actividad

            //itero columns buscando el card con el id selectedTaskShow.id
            //TODO: hacer
            console.log('onDeleteActivity', id)

            this.columns.forEach((column) => {
                let card = column.cards.find(card => card.id == this.selectedTaskShow.id);
                //.listaActividad.splice(column.cards.find(card => card.id == this.selectedTaskShow.id)
                //.listaActividad.findIndex(actividad => actividad.id === id))
                console.log(card)

                //elimino de listaActividad la actividad con el id
                let activity = card.listaActividad.find((actividad) => actividad.id === id)
                console.log(activity)
                //card.listaActividad.splice(card.listaActividad.indexOf(activity), 1)
            })
        },
        updateCard(val) {
            this.selectedTaskShow = val
            this.columns.forEach((column) => {
                column.cards.forEach((card) => {
                    if (card.id == val.id) {
                        card = val
                    }
                })
            })
            this.visible = false
        },
        formDatatime(fecha_hora) {
            return moment(fecha_hora).format('DD/MM/YYYY HH:mm:ss')
        },
        deleteActivity(id) {
            console.log(id)
            this.$emit('delete-activity', id)
        }
    }
}
</script>


<style>
.clickable {
    cursor: pointer;
}

.ck-editor__editable {
    min-height: 75px !important;
}

#board {
    position: absolute;
    left: 0px;
    right: 0px;
    box-sizing: border-box;
    padding: 10px;
    align-items: flex-start;
    overflow-x: auto;
    flex-wrap: nowrap
}

.borderText {
    border: 1px solid
}

.minHeight {
    min-height: 350px
}

.ghost,
.sortable-chesen {
    opacity: 0.5;
}

.draggable {
    border: 1px solid
}

.widthColumn {
    width: 300px !important;
    display: flex;
    flex: 0 0 auto;
}

.cardColumm {
    max-height: 100%;
    flex-direction: column;
    display: flex;
    flex: 0 0 auto;
    align-items: stretch !important;
    box-sizing: border-box;
    box-shadow: 1px 1px 3px -2px #000
}

.cardColummHeader {
    flex: 0 0 auto;
    position: relative;
}

.cardColummContent {
    flex: 1 1 auto;
    margin-bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1;
    min-height: 0;
}

.draggable {
    min-height: 150px;
    border: 1px solid;
    display: inline
}

.hoverPointer:hover {
    cursor: pointer;
}

.hoverGrab:hover {
    cursor: grab
}

.button {
    margin-top: 35px;
}

.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
}

.list-group-item i {
    cursor: pointer;
}



.scrollBar::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);
}

.scrollBar::-webkit-scrollbar {
    width: 6px;
    background-color: rgba(0, 0, 0, 0.1);
}

.scrollBar::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #555;
}

.button-add-card {
    border: 0px;
}

.v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitle {
    line-height: 1.2;
    font-size: 14px;
}

.v-list-item {
    min-height: 30px;
}
</style>