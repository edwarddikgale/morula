import {Action} from '../types/Action';
  
class RandomActionGenerator {

    private actions: Action[] = [];
    private usedIndices: Set<number> = new Set();
    private refreshList: boolean = false;
    private sdg: number;
  
    constructor(sdg: number, refresh: boolean = false) {
      console.log(`SDG initiated to: ${sdg}`);
      this.sdg = sdg;
      this.refreshList = refresh;
      this.fetchActions(this.sdg);
    }
  
    private async fetchActions(sdg:number) {
      if (!this.refreshList && this.actions.length === 0 && localStorage.getItem('actions')) {
        this.actions = JSON.parse(localStorage.getItem('actions')!);
        this.usedIndices.clear();
        return;
      }

      await fetch(`https://susact-dev.herokuapp.com/api/actionglobals/bysdg/${sdg}`)
          .then((response) => response.json())
          .then(data => {
              if(data && data.records){
                this.actions = data.records.map((action: Action) => ({ ...action, id: null }));
                this.usedIndices.clear();
                localStorage.setItem('actions', JSON.stringify(this.actions));
                console.log(`Fetched initial global actions of length: ${data.records.length}`);
            }    
              
      })
      .catch(error => console.error('Error fetching actions data:', error)); 
    }
  
    public getRandomAction(): Action | undefined {
      if (!this.actions || this.actions.length === 0) {
        console.warn('No actions available. Make sure to fetch the actions first.');
        return undefined;
      }
  
      let randomIndex: number;
      do {
        randomIndex = Math.floor(Math.random() * this.actions.length);
      } while (this.usedIndices.has(randomIndex));
  
      this.usedIndices.add(randomIndex);
      return this.actions[randomIndex];
    }

    public getRandomActions(numOfActions: number): Action[] {
        if (!this.actions || this.actions.length === 0) {
          console.warn('No actions available. Make sure to fetch the actions first.');
          return [];
        }
      
        const randomActions: Action[] = [];
        const availableActions = Array.isArray(this.actions)
            ? this.actions.filter((_, index) => !this.usedIndices.has(index))
            : [];
      
        for (let i = 0; i < numOfActions; i++) {
          if (!availableActions || availableActions.length === 0) {
            console.warn('No more available actions.');
            break;
          }
      
          const randomIndex = Math.floor(Math.random() * availableActions.length);
          const randomAction = availableActions[randomIndex];
      
          randomActions.push(randomAction);
          this.usedIndices.add(this.actions.indexOf(randomAction));
          availableActions.splice(randomIndex, 1);
        }
      
        return randomActions;
    }
}
  
export default RandomActionGenerator;
  