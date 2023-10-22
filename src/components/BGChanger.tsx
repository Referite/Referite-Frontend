import { useEffect } from 'react';

function BGChanger() {
    useEffect(() => {
        document.body.style.minHeight = '100vh'
        document.body.style.margin = '0';
        document.body.style.width = '100%';
        document.body.style.height = '100%';

        document.body.style.backgroundColor = '#f3f3f3';
    
        return () => {
            document.body.style.backgroundColor = '';
        };
      }, []);

    return (
        <> </> 
    )
}

export default BGChanger