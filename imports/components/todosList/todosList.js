import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todosList.html';
import { Tasks } from '../../api/tasks.js';
 
class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
        tasks() {
            // Show the newest tasks at the top
            return Tasks.find({}, {
              sort: {
                createdAt: -1
              }
            });
        }
    })
  }

  addTask(newTask) {
      // Insert a task into the collection
      Tasks.insert({
          text: newTask,
          createdAt: new Date()
      });

      // Clear form
      this.newTask = '';
  }
}
 
export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });
