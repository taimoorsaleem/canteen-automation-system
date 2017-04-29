import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from '../../../../models/food.model';
import { FoodPreference } from '../../../../models/preference.model';
import { FoodService } from '../../../../services/food-service';
import { Item } from '../../../../models/inventory.model';

@Component({
    selector: 'food-modal',
    templateUrl: 'food-modal.component.html'
})

export class FoodModalComponent {
    constructor() { }

    ////////INPUTS////////

    @Input() foodService: FoodService;
    @Input() foodItem: FoodItem;

    ////////DECLARATIONS////////

    prefObject: FoodPreference;
    item: Item;
    inventoryItem: Array<Item> = [];

    ////////EVENTS////////

    receivePrefObject(newPrefObject: FoodPreference) {
        if ('index' in newPrefObject) {
            console.log('edit hai');
            console.log(newPrefObject);
            let index = newPrefObject.index;
            delete newPrefObject.index;
            this.foodItem.food_prefs[index] = newPrefObject;
        }

        else {
            console.log('add hai');
            if (!(this.foodItem.food_prefs)) {
                this.foodItem.food_prefs = []
            }

            this.foodItem.food_prefs.push(newPrefObject);
            console.log(newPrefObject);
        }
    }

    recivedInventoryItem(newItem: Item) {
        //  this.inventoryItem.push(newItem);
        // console.log(this.inventoryItem);

        this.foodItem.inventory_item.push(newItem);
        console.log(this.foodItem.inventory_item);
        this.nullItem();
    }

    ngOnInit() {
        this.nullFoodItem();
        this.nullPreference();
        this.nullItem();
    }

    ////////BUTTONS////////

    clickConfirm() {
        if (this.foodItem.$key) {
            let key: string = this.foodItem.$key;
            delete this.foodItem.$key;
            this.foodService.editFoodItem(key, this.foodItem).then(() => {
                this.nullFoodItem();
            }).catch((error) => {
                console.log(error);
            })
        }

        else {
            this.foodService.addFoodItem(this.foodItem).then(() => {
                this.nullFoodItem();
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    clickEdit(foodPref: FoodPreference, prefIndex: number) {
        this.prefObject = Object.assign({}, foodPref);
        this.prefObject.index = prefIndex;
    }

    clickRemove(prefIndex: any) {
        this.foodItem.food_prefs.splice(prefIndex, 1);
    }


    clickEditItem(inventoryItem: Item, itemIndex: number) {
        this.foodItem.inventory_item[itemIndex] = inventoryItem;
    }

    clickRemoveItem(itemIndex: any) {
        this.foodItem.inventory_item.splice(itemIndex, 1)
    }


    ////////METHODS////////

    nullFoodItem() {
        this.foodItem = {
            food_title: '',
            food_price: null,
            food_prefs: [],
            inventory_item: []
        }
    }

    nullPreference() {
        this.prefObject = {
            pref_title: '',
            pref_type: '',
            pref_values: []
        }
    }

    nullItem() {
        this.item = {
            name: '',
            quantity: '',
            id: '',
        }
    }
}