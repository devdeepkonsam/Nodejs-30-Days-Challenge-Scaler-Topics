class Main{
    public static void main(String[] args){
        String a1 = "devdeep";
        String a2 = "singha";
        System.out.println(a1.concat(a2));
        System.out.println(a1.toLowerCase());
        System.out.println(a1.toUpperCase());
        System.out.println(a1.indexOf("dee"));
        int a = 23;
        int b = 14;
        System.out.println(Math.max(a, b));
        switch (a) {
            case 14 :
                System.out.println("hello world");
                break;
            case 23 :
                System.out.println("Welcome to java");
                break;
            default:
                System.out.println("nice");
        }

    }
}