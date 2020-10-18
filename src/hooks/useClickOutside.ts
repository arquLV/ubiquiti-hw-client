import { useEffect, useCallback } from 'react';

const useClickOutside = (ref: React.RefObject<any>, onClickOutside?: Function) => {

    const clickHandler = useCallback((e: MouseEvent) => {
        if (ref.current !== null && ref.current !== e.target) {
            onClickOutside?.();
        }
    }, [ref, onClickOutside]);

    useEffect(() => {
        document.addEventListener('click', clickHandler);

        return () => {
            document.removeEventListener('click', clickHandler);
        }
    }, [clickHandler]);
}

export default useClickOutside;