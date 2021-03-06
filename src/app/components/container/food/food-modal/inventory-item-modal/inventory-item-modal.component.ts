import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2';
import { InventoryFilterByName } from '../.../../../../../../pipes/filter-inventory-pipe';
import { InventoryService } from '../../../../../services/inventory-service';
import { Item } from '../../../../../models/inventory.model';
declare var $: any;
@Component({
    selector: 'inventoryItem-modal',
    templateUrl: 'inventory-item-modal.component.html',
    styles: [
        `.text-font{
            padding: 5px;
    font-size: 1.2em;
    }`]
})
export class InventoryItemConponent {
    inventoryItems: FirebaseListObservable<Array<Item>>;
    filterInventoryName: string = '';
    ////////OUTPUTS////////

    @Output() inventoryItemEvent = new EventEmitter();
     @Output() cancelEvent = new EventEmitter();

    ///////INPUTS//////////

    @Input() item: Item;

    constructor(private inventoryService: InventoryService) { }

    ngOnInit() {
        // this.inventoryService.getInventoryData().subscribe((data) => {
        //     this.inventoryItems = data;
        // }).unsubscribe();
        this.loadOrderData();
    }

    clickConfirm() {
        if (this.item.name != '' || this.item.quantity != '') {
            this.inventoryItemEvent.emit(this.item);
            this.nullInventoryItem();
        }
        else
            console.log('Error while insertion');
            $('#inventoryItemModal').modal('hide');
    }

    nullInventoryItem() {
        this.item = {
            name: '',
            quantity: '',
            id: '',
            unit: ''
        }
    }

    loadOrderData() {
        this.inventoryItems = this.inventoryService.getInventoryData();
    }

    clickCancel(){
        this.nullInventoryItem();
        this.cancelEvent.emit('modal close');
    }

    selectedItem(inventoryItem) {
        this.item.name = inventoryItem.name;
        this.item.id = inventoryItem.$key;
        console.log(inventoryItem.$key);
      
    }
}