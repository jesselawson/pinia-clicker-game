export const setInterval2 = (fn:VoidFunction,time:number) => {
    // A place to store the timeout Id (later)
    let timeout:any = null; 

    // calculate the time of the next execution
    let nextAt = Date.now() + time; 

    const wrapper = () => {
        // calculate the time of the next execution:
        nextAt += time; 

        // set a timeout for the next execution time:
        timeout = setTimeout(wrapper, nextAt - Date.now()); 
        
        // execute the function:
        return fn(); 
    };

    // Set the first timeout, kicking off the recursion:
    timeout = setTimeout(wrapper, nextAt - Date.now()); 

        // A way to stop all future executions:
    const cancel = () => clearTimeout(timeout); 

    // Return an object with a way to halt executions:
    return { cancel }; 
};
