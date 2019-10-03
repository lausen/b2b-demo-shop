import TogglerClickCore from 'ShopUi/components/molecules/toggler-click/toggler-click';

export default class TogglerClick extends TogglerClickCore {
    protected disablers: HTMLElement[];

    protected init(): void {
        if (this.removerClassName) {
            const disablerClassNamesList = this.removerClassName.split(',');

            this.saveCollectionToProperty('disablers', disablerClassNamesList);
        }

        super.init();
    }

    protected mapEvents(): void {
        super.mapEvents();

        if (this.disablers) {
            this.disablers.forEach((disabler: HTMLElement) => {
                disabler.addEventListener('click', (event: Event) => this.removeClassToToggle());
            });
        }
    }

    protected saveCollectionToProperty(propertyName: string, classes: string[]): void {
        if (!classes.length) {
            return;
        }

        let property: HTMLElement[];

        classes.forEach((className, index) => {
            if (!index) {
                property = <HTMLElement[]>Array.from(document.getElementsByClassName(className));

                return;
            }

            property = [...property, Object.assign(document.getElementsByClassName(className))];
        });

        this[propertyName] = <HTMLElement[]>property;
    }

    protected removeClassToToggle(): void {
        this.targetsList.forEach((target: HTMLElement) => {
            target.classList.remove(this.classToToggle);
        });
    }

    toggle(): void {
        this.onTriggerToggleClass(event);

        super.toggle();
    }

    protected onTriggerToggleClass(event: Event): void {
        if (!this.triggerClassToToggle.length) {
            return;
        }

        const triggerTarget = <HTMLElement>event.currentTarget;

        triggerTarget.classList.toggle(this.triggerClassToToggle);
    }

    protected get triggerClassToToggle(): string {
        return this.getAttribute('trigger-class-to-toggle');
    }

    protected get removerClassName(): string {
        return this.getAttribute('removers-toggler-class-to-toggle');
    }
}
