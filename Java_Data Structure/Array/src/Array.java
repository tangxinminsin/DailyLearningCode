/**
 * @author Sintx createdDate: 2021-10-28 9:46 Description:
 * @since JDK 1.8
 */
public class Array {
  private int[] data;
  private int size; // 当前数组大小（下标）
  /**
   * 构造函数，传入数组的容量capacity构造Array
   *
   * @param capacity
   */
  public Array(int capacity) {
    data = new int[capacity];
    size = 0;
  }

  // 无参数的构造函数，默认数组的容量capacity=10
  public Array() {
    this(10);
  }
  // 获取数组中的元素
  public int getSize() {
    return size;
  }
  // 获取数组中的容量
  public int getCapacity() {
    return data.length;
  }
  // 判断数组是否为空
  public boolean isEmpty() {
    return size == 0;
  }
  // 向数组中插入一个元素
  public void add(int index, int e) {
    if (size == data.length) {
      throw new IllegalArgumentException("Add failed, Array is full.");
    }
    if (index < 0 || index > size) {
      throw new IllegalArgumentException("Add failed,Require index>=0 and index<=size.");
    }
    for (int i = size; i >= index; i--) {
      data[i] = data[size - 1];
    }
    data[index] = e;
    size++;
  }

  //  向所有元素后添加一个新元素
  public void addLast(int e) {
    add(size, e);
  }
  // 在所有元素前添加一个新元素
  public void addFirst(int e) {
    add(0, e);
  }
  // 获取index索引位置的元素
  public int get(int index) {
    if (index < 0 || index > size) {
      throw new IllegalArgumentException("Get failed. Index is illegal.");
    }
    return data[index];
  }
}
